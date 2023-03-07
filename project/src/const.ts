import { SortItem } from './types/SortItem';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = '/room/:id',
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

export const ratingStars = [
  { name: 'perfect', id: 5, checked: false },
  { name: 'good', id: 4, checked: false },
  { name: 'not bad', id: 3, checked: false },
  { name: 'badly', id: 2, checked: false },
  { name: 'terribly', id: 1, checked: false },
];

export const SCALE = 0.05;
