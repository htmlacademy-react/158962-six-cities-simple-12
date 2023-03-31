import {combineReducers} from '@reduxjs/toolkit';
import AppSlice from './slices/app-slice';
import OfferSlice from './slices/offer-slice';
import UserSlice from './slices/user-slice';
import SingleOffer from './slices/single-offer-slice';
import NearbyOffers from './slices/nearby-offers-slice';
import CommentsSlice from './slices/comments-slice';

export const rootReducer = combineReducers({
  sort: AppSlice,
  offer: OfferSlice,
  singleOffer: SingleOffer,
  user: UserSlice,
  nearbyOffers: NearbyOffers,
  comments: CommentsSlice,
});
