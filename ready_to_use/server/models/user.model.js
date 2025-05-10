import argon2 from 'argon2';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    google: {
      id: String,
      displayName: String
    },
    facebook: {
      id: String,
      displayName: String
    },
    github: {
      id: String,
      displayName: String
    },
    dob: { type: Date },
    phone: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
    address: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    lastLoggedInDate: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.isValidPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

export default mongoose.model('User', UserSchema);
