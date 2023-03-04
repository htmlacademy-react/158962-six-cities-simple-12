export enum AppRoute {
  Root = '/',
  Login = '/login',
  Room = 'room/:id',
  Favorite = '/favorites',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const PLACES_TO_STAY:string[] = ['Paris', 'Cologne', 'Brussels', 'Hamburg', 'Dusseldorf'];
