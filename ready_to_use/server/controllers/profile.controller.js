import mongoose from 'mongoose';
import { sanitizeUser } from '##/server/services/user.services.js';
import { handleError } from '##/server/utility/utility.js';

const UserProfile = mongoose.model('UserProfile');
const Address = mongoose.model('Address');
const User = mongoose.model('User');

function loadMe(req, res) {
  res.json({ user: sanitizeUser(req.user) });
}

async function createProfile(req, res) {
  // console.log("user - ", req);
  try {
    const { bio, avatar, interestIn, user } = req.body;
    const userId = req.user ? req.user._id : user;

    console.log('Received data:', { bio, avatar, interestIn, userId });

    const existingProfile = await UserProfile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({ message: 'Profile already exists for this user' });
    }

    const newProfile = new UserProfile({
      user: userId,
      bio,
      avatar,
      interestIn
    });

    const savedProfile = await newProfile.save();
    await mongoose.model('User').findByIdAndUpdate(userId, { profile: savedProfile._id });

    res.json({ profile: savedProfile });
  } catch (error) {
    return handleError(res, error);
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const { name, phone,
      profile, address } = req.body;
    const { country, state, city, zip } = address || {};
    const { bio, avatar, interestIn } = profile || {};

    const updateData = {};
    const userData = {};
    if (name) userData.name = name;
    if (phone) userData.phone = phone;

    if (bio) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;
    if (interestIn) updateData.interestIn = interestIn;



    if (address) {
      await Address.findOneAndUpdate(
        { _id: address._id },
        { $set: { country, state, city, zip } },
        { new: true, runValidators: true }
      );
    }

    if (profile) {
      await UserProfile.findOneAndUpdate(
        { user: userId },
        { $set: updateData },
        { new: true, runValidators: true }
      );
    }

    if (Object.keys(userData).length > 0) {
      await User.findByIdAndUpdate(
        userId,
        { $set: userData },
        { new: true, runValidators: true }
      );
    }

    const user = await User.findOne({ _id: userId }).populate('profile').populate('address');

    res.json({ user: user });
  } catch (error) {
    return handleError(res, error);
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.params.userId || req.user._id;

    const profile = await UserProfile.findOne({ user: userId })
      // .populate('address')
      .populate('user');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({ profile });

  } catch (error) {
    return handleError(res, error);
  }
}

async function deleteProfile(req, res) {
  try {
    const userId = req.user._id;

    const deletedProfile = await UserProfile.findOneAndDelete({ user: userId });
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await mongoose.model('User').findByIdAndUpdate(userId, { $unset: { profile: 1 } });
    await Address.deleteMany({ _id: { $in: deletedProfile.address } });

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    return handleError(res, error);
  }
}

export { loadMe, createProfile, updateProfile, getProfile, deleteProfile };
