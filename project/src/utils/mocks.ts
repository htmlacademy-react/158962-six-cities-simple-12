import {commerce, datatype, date, image, internet, lorem} from 'faker';
import {UserData} from '../store/slices/user-slice/user-slice';
import {City, Host, Location, Offer} from '../types/offer';
import {address} from 'faker/locale/en';
import {Review} from '../types/review';
import { Notification } from '../types/notification';

export const makeFakeUserData = (): UserData => ({
  id: datatype.number(),
  avatarUrl: internet.avatar(),
  email: internet.email(),
  token: datatype.string(),
});

export const makeFakeUser = (): Host => ({
  id: datatype.number(),
  name: internet.userName(),
  isPro: datatype.boolean(),
  avatarUrl: internet.avatar(),
});

export const makeFakeLocation = (): Location => ({
  zoom: datatype.number({ min: 5, max: 15 }),
  latitude: datatype.number({ min: 5, max: 6, precision: 0.0001 }),
  longitude: datatype.number({ min: 4, max: 10, precision: 0.001 }),
});

export const makeFakeCity = (): City => ({
  name: address.cityName(),
  location: makeFakeLocation(),
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  title: lorem.word(10),
  type: commerce.product(),
  price: datatype.number(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  previewImage: image.imageUrl(),
  images: Array.from({ length: 2 }, () =>
    image.imageUrl(260, 200, 'cat', true)
  ),
  bedrooms: datatype.number({ min: 1, max: 10 }),
  maxAdults: datatype.number({ min: 1, max: 5 }),
  goods: [commerce.product()],
  description: commerce.productDescription(),
  host: makeFakeUser(),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

export const makeFakeOffers = (): Offer[] =>
  Array.from({ length: 11 }, makeFakeOffer);

export const makeFakeNearbyOffers = (): Offer[] =>
  Array.from({ length: 3 }, makeFakeOffer);

export const makeFakeReview = (): Review => ({
  id: datatype.number(),
  user: makeFakeUser(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.1 }),
  comment: lorem.sentence(),
  date: String(date.recent()),
});

export const makeFakeComments = (): Review[] =>
  Array.from({ length: 5 }, makeFakeReview);

export const makeFakeNotification = (): Notification =>
  ({
    id: String(datatype.number()),
    type: 'info',
    message: lorem.words(15),
    duration: datatype.number({ min: 2000, max: 3000 }),
  } as Notification);

