import {combineReducers} from '@reduxjs/toolkit';
import AppSlice from './slices/app-slice';
import OfferSlice from './slices/offer-slice';
import UserSlice from './slices/user-slice';

export const rootReducer = combineReducers({
  sort: AppSlice,
  offer: OfferSlice,
  user: UserSlice,
});
