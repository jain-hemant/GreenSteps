import mongoose from 'mongoose';

const Badge = mongoose.model('Badge');
const User = mongoose.model('User');

/**
 * Get all system badges
 */
async function getAllBadges(req, res) {
  const badges = await Badge.find();
  res.json(badges);
}

/**
 * Get user's earned badges
 */
async function getUserBadges(req, res) {
  const userId = req.params.userId;
  const user = await User.findById(userId).populate('earnedBadges');
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }
  res.json(user.earnedBadges);
}

/**
 * Helper: check and assign badges based on user stats
 * (Called after log creation/edit.)
 */
async function checkAndAssignBadges(user) {
  const allBadges = await Badge.find();
  for (const badge of allBadges) {
    let earned = false;
    // Example criteria checks
    if (badge.type === 'streak' && user.streak >= badge.requirement) {
      earned = true;
    }
    if (badge.type === 'points' && user.ecoPoints >= badge.requirement) {
      earned = true;
    }
    // Other criteria (e.g. category completions) could be added here
    if (earned && !user.earnedBadges.includes(badge._id)) {
      user.earnedBadges.push(badge._id);
    }
  }
  await user.save();
}

export { getAllBadges, getUserBadges, checkAndAssignBadges };
