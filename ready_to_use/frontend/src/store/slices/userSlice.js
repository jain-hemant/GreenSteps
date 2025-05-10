import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Api from '##/src/request.js';

const deleteAccount = createAsyncThunk('user/delete-account', (userId) => {
  return Api.fetch(`/api/user/delete/${userId}`, {
    method: 'DELETE',
  });
});

const fetchMe = createAsyncThunk('user/fetchMe', () => {
  return Api.fetch('/api/profile/me');
});

const fetchAllUsers = createAsyncThunk('user/fetAll', () => {
  return Api.fetch('/api/user/getAll');
});

const updateUserProfile = createAsyncThunk(
  'user/update-profile',
  ({ userId, updates }) => {
    return Api.fetch(`/api/user/update/${userId}`, {
      method: 'PATCH',
      body: updates,
    });
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    me: null,
    users: [],
  },
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload.user;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });

    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      const { updatedUser } = action.payload;
      state.me = updatedUser;
    });

    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.me = null;
    });
  },
});

const { setMe } = userSlice.actions;
const selectMe = (state) => state.user.me;
const selectUsers = (state) => state.user.users;
const userReducer = userSlice.reducer;

export { setMe, selectMe, selectUsers, fetchMe, fetchAllUsers, updateUserProfile, deleteAccount };
export default userReducer;
