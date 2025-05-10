// create user profile model to store user profile data basic data store in use.model.js
import mongoose from 'mongoose';

const UserProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        bio: {
            type: String,
        },
        // profile pic
        avatar: {
            type: String,
        },
        // interest can be multiple so we will store it in array
        interestIn: [
            {
                type: String,
            }
        ],
    }
)

export default mongoose.model('UserProfile', UserProfileSchema);