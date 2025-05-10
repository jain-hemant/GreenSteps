import mongoose from 'mongoose';
import { handleError } from '##/server/utility/utility.js';

const Address = mongoose.model('Address');
const UserProfile = mongoose.model('UserProfile');
const User = mongoose.model('User');

async function createAddress(req, res) {
    try {
        const { country, state, city, zip } = req.body;
        const userId = req.user._id;

        const newAddress = new Address({
            user: userId,
            country,
            state,
            city,
            zip
        });

        const savedAddress = await newAddress.save();

        // Add address reference to user's profile
        await UserProfile.findOneAndUpdate(
            { user: userId },
            { $push: { address: savedAddress._id } }
        );

        res.json({ address: savedAddress });
    } catch (error) {
        return handleError(res, error);
    }
}

// Create address during registration process (no authentication required)
async function createAddressForRegistration(req, res) {
    console.log('createAddressForRegistration', req.body);
    try {
        const { userId, country, state, city, zip, address } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid or missing user ID' });
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new address
        const newAddress = new Address({
            user: userId,
            country,
            state,
            city,
            zip,
            address
        });

        const savedAddress = await newAddress.save();

        // Add address reference to user
        await User.findByIdAndUpdate(
            userId,
            { $push: { address: savedAddress._id } }
        );

        res.json({
            message: 'Address added successfully',
            address: savedAddress,
            userId: userId
        });
    } catch (error) {
        return handleError(res, error);
    }
}

async function updateAddress(req, res) {
    try {
        const { addressId } = req.params;
        const userId = req.user._id;
        const { country, state, city, zip } = req.body;

        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: 'Invalid address ID' });
        }

        const updateData = {};
        if (country) updateData.country = country;
        if (state) updateData.state = state;
        if (city) updateData.city = city;
        if (zip) updateData.zip = zip;

        const updatedAddress = await Address.findOneAndUpdate(
            { _id: addressId, user: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json({ address: updatedAddress });
    } catch (error) {
        return handleError(res, error);
    }
}

async function getAddress(req, res) {
    try {
        const { addressId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: 'Invalid address ID' });
        }

        const address = await Address.findOne({ _id: addressId, user: userId });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json({ address });
    } catch (error) {
        return handleError(res, error);
    }
}

async function getAllAddresses(req, res) {
    try {
        const userId = req.user._id;
        const addresses = await Address.find({ user: userId });
        res.json({ addresses });
    } catch (error) {
        return handleError(res, error);
    }
}

async function deleteAddress(req, res) {
    try {
        const { addressId } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            return res.status(400).json({ message: 'Invalid address ID' });
        }

        const deletedAddress = await Address.findOneAndDelete({ _id: addressId, user: userId });
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Remove address reference from user's profile
        await UserProfile.findOneAndUpdate(
            { user: userId },
            { $pull: { address: addressId } }
        );

        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        return handleError(res, error);
    }
}

export { createAddress, createAddressForRegistration, updateAddress, getAddress, getAllAddresses, deleteAddress };