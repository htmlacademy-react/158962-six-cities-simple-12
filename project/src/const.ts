import { SortItem } from './types/SortItem';
import { Form } from './types/Form';

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

export const STARS_LIST: Form[] = [
  { name: 'terribly', id: 1, checked: false },
  { name: 'badly', id: 2, checked: false },
  { name: 'not bad', id: 3, checked: false },
  { name: 'good', id: 4, checked: false },
  { name: 'perfect', id: 5, checked: false },
];

