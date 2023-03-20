import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './slices/offer-slice';
import appSlice from './slices/app-slice';

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    sort: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
