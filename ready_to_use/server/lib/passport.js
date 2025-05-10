// passport-config.js
import { callbackify } from 'node:util';

import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';

import logger from '##/server/lib/logger.js';
const User = mongoose.model('User');

function initializePassport(app) {
  // Serialize sessions
  passport.serializeUser(
    callbackify(async (user) => {
      return user._id;
    }),
  );

  // Deserialize sessions
  passport.deserializeUser(
    callbackify(async (userId) => {
      if (!mongoose.isValidObjectId(userId)) {
        // If this error occurs, it's because an invalid user ID was somehow
        // written into the user session, which should be impossible and would
        // be a major error.
        logger.error('Cannot deserialize user object. Malformed user ID.', {
          userId,
        });
        return null;
      }
      return User.findOne({
        _id: userId,
      }).populate('address').populate('profile');
    }),
  );

  // Initialize local strategy
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      callbackify(async (email, password) => {
        const user = await User.findOne({
          email: email.toLowerCase(),
        }).populate('address').populate('profile');

        if (!(await user?.isValidPassword(password))) {
          throw new Error(
            `Invalid email or password (${new Date().toLocaleTimeString()})`,
          );
        }
        // Update the lastLoggedInDate field and save
        user.lastLoggedInDate = new Date();
        await user.save();
        return user;
      }),
    ),
  );

  // Initialize Google OAuth strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          name: profile.displayName,
          google: { id: profile.id, displayName: profile.displayName },
        });
      } else if (!user.google) {
        user.google = { id: profile.id, displayName: profile.displayName };
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // Initialize Facebook OAuth strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails && profile.emails[0] ? profile.emails[0].value : '' });
      if (!user) {
        user = await User.create({
          email: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
          name: profile.displayName,
          facebook: { id: profile.id, displayName: profile.displayName },
        });
      } else if (!user.facebook) {
        user.facebook = { id: profile.id, displayName: profile.displayName };
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // Initialize GitHub OAuth strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email'],
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let userEmail = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
      if (!userEmail) {
        const emailResponse = await fetch('https://api.github.com/user/emails', {
          headers: {
            'Authorization': `token ${accessToken}`
          }
        });
        const emails = await emailResponse.json();
        userEmail = emails.find(email => email.primary).email;
      }
      let user = await User.findOne({ email: userEmail });
      if (!user) {
        user = await User.create({
          email: userEmail,
          name: profile.displayName,
          github: { id: profile.id, displayName: profile.displayName },
        });
      } else if (!user.github) {
        user.github = { id: profile.id, displayName: profile.displayName };
        await user.save();
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // Initialize Passport and restore authentication state, if any, from the session
  app.use(passport.initialize());
  app.use(passport.session());
}

export default initializePassport;
