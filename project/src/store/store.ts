import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './slices/offer-slice';
import sortSlice from './slices/sort-slice';

export const store = configureStore({
  reducer: {
    offer: offerSlice,
    sort: sortSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
