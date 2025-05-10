import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertSlice from './slices/alertSlice.js';
import applicationSlice from './slices/applicationSlice.js';
import authReducer from './slices/authSlice.js';
import userReducer from './slices/userSlice.js';
import sidebarReducer from './slices/sidebarSlice.js';
import profileReducer from './slices/profileSlice.js';

// Combine multiple reducers
const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertSlice,
  application: applicationSlice,
  user: userReducer,
  sidebar: sidebarReducer,
  profile: profileReducer,
});

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
  // Only persist these reducers
  whitelist: ['auth', 'sidebar'],
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Required for Redux Persist
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
