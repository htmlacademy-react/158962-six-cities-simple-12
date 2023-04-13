import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import AppSlice from './slices/app-slice/app-slice';
import OfferSlice from './slices/offer-slice/offer-slice';
import UserSlice from './slices/user-slice/user-slice';
import SingleOffer from './slices/single-offer-slice/single-offer-slice';
import NearbyOffers from './slices/nearby-offers-slice/nearby-offers-slice';
import CommentsSlice from './slices/comments-slice/comments-slice';
import NotificationsSlice from './slices/notification-slice/notification-slice';
import FavoritesSlice from './slices/favorites-slice/favorites-slice';

export const rootReducer = combineReducers({
  [NameSpace.Sorting]: AppSlice,
  [NameSpace.Offers]: OfferSlice,
  [NameSpace.SingleOffer]: SingleOffer,
  [NameSpace.User]: UserSlice,
  [NameSpace.NearbyOffers]: NearbyOffers,
  [NameSpace.Comments]: CommentsSlice,
  [NameSpace.Notifications]: NotificationsSlice,
  [NameSpace.Favorites]: FavoritesSlice,
});
