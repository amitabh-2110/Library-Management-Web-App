import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userAuth/userAuthSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});