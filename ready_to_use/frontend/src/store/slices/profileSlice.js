import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../request.js';

// Async thunk for updating user profile
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await Api.fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for changing password
export const changePassword = createAsyncThunk(
    'profile/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await Api.fetch('/api/user/password', {
                method: 'PUT',
                body: JSON.stringify(passwordData)
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async thunk for user logout
export const logout = createAsyncThunk(
    'profile/logout',
    async (_, { rejectWithValue }) => {
        try {
            await Api.fetch('/api/auth/logout', {
                method: 'POST'
            });
            return true;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isUpdating: false,
        error: null,
        updateSuccess: false
    },
    reducers: {
        clearProfileState: (state) => {
            state.error = null;
            state.updateSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.isUpdating = false;
                state.updateSuccess = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload;
            })
            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.isUpdating = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isUpdating = false;
                state.updateSuccess = true;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.isUpdating = false;
                state.error = null;
            });
    }
});

export const { clearProfileState } = profileSlice.actions;

export const selectProfileState = (state) => state.profile;

export default profileSlice.reducer;