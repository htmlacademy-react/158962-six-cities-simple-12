import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './slices/offer-slice';

export const store = configureStore({
  reducer: {
    offer: offerSlice,

  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
