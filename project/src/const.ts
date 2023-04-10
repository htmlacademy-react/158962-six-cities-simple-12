import { Sort } from './types/sort';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorite = '/favorites',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}


export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
export const [DEFAULT] = CITIES;

export const SORT_LIST: Sort = {
  DEFAULT: {
    name: 'Popular',
    sortProperty: 'default',
  },
  PRICE_HIGH: {
    name: 'Price: high to low',
    sortProperty: 'price',
  },
  PRICE_LOW: {
    name: 'Price: low to high',
    sortProperty: '-price',
  },
  RATING: {
    name: 'Top rated first',
    sortProperty: 'rating',
  },
};

export const RATING_STARS = [
  {
    name: 'perfect',
    id: 5
  },
  {
    name: 'good',
    id: 4
  },
  {
    name: 'not bad',
    id: 3
  },
  {
    name: 'badly',
    id: 2
  },
  {
    name: 'terribly',
    id: 1
  },
];

export const MAX_RATING = 5;

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const CARD_AMOUNT = 6;
export const REVIEWS_AMOUNT = 10;

export const EMAIL_REGEXP = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
export const PASSWORD_REGEXP = /^(?=.*[0-9])(?=.*[a-z]){6,}/g;

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const LOGIN_FIELDS:Record<string, string> = {
  email: 'E-mail',
  password: 'Password',
};

export enum NameSpace {
  Offers = 'OFFERS',
  SingleOffer = 'SINGLE_OFFER',
  User = 'USER',
  Sorting = 'SORT',
  Comments = 'COMMENTS',
  NearbyOffers = 'NEARBY_OFFERS',
  Notifications = 'NOTIFICATIONS',
  Favorites = 'FAVORITES',
}
