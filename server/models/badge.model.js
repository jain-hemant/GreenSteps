import mongoose from 'mongoose';

const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  iconUrl: { type: String },
  type: {
    type: String,
    enum: ['points', 'streak', 'milestone'],
    required: true,
  },
  threshold: { type: Number, required: true }, // e.g. points needed or days in streak
  createdAt: { type: Date, default: Date.now },
});

const Badge = mongoose.model('Badge', BadgeSchema);

export default Badge;
