import { configureStore } from '@reduxjs/toolkit';
import offerSlice from './slices/offer-slice';
import appSlice from './slices/app-slice';
import userSlice from './slices/user-slice'
import { createAPI } from '../services/api';
import { useDispatch } from 'react-redux';
import {rootReducer} from './root-reducer';
import {redirect} from './middelwares/redirect';

export const api = createAPI();

export const store = configureStore({
  /*reducer: {
    offer: offerSlice,
    sort: appSlice,
    user: userSlice,
  },*/
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
