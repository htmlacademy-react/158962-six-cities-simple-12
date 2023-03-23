import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './slices/offer-slice';
import appSlice from './slices/app-slice';
import { createAPI } from '../services/api';
import { useDispatch } from 'react-redux';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    sort: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
