import { SortItem } from './types/SortItem';

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

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const LIST:SortItem[] = [
  {name: 'Popular', sortProperty: 'rating',},
  {name: 'Price: high to low', sortProperty: 'price',},
  {name: 'Price: low to high', sortProperty: '-price',},
  {name: 'Top rated first', sortProperty: 'top',},
];

export const RATING_STARS = [
  { name: 'perfect', id: 5 },
  { name: 'good', id: 4 },
  { name: 'not bad', id: 3 },
  { name: 'badly', id: 2 },
  { name: 'terribly', id: 1 },
];

export const MAX_RATING = 5;

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

