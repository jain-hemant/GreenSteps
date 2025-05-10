import * as authController from '##/server/controllers/auth.controller.js';
import { createProfile } from '##/server/controllers/profile.controller.js';
import passport from 'passport';

export default function routes(app) {
  app.route('/api/auth/login').post(authController.login);
  app.post('/api/auth/logout', authController.logout);
  app.post('/api/auth/register', authController.registerUser);
  app.post('/api/auth/register/profile', createProfile);
  app.post('/api/auth/isAuthenticated', authController.isAuthenticated);
  // Google OAuth
  app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: true }), (req, res) => {
    res.redirect('/');
  });
  // Facebook OAuth
  app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
  app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: true }), (req, res) => {
    res.redirect('/');
  });
  // GitHub OAuth
  app.get('/api/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
  app.get('/api/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login', session: true }), (req, res) => {
    res.redirect('/');
  });
}
