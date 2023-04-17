import { Offer } from '../types/offer';
import { SORT_LIST } from '../const';
import { SortItem } from '../types/sort';

export const getRatingWidth = (rating: number, maxRating: number): number => {
  const num = maxRating / 100;
  return Math.round(rating) / num;
};

export const sortOffers = (coll: Offer[], sort: SortItem): Offer[] => {
  switch (sort.sortProperty) {
    case SORT_LIST.PRICE_HIGH.sortProperty:
      return coll.sort((itemA, itemB) => itemB.price - itemA.price);

    case SORT_LIST.PRICE_LOW.sortProperty:
      return coll.sort((itemA, itemB) => itemA.price - itemB.price);

    case SORT_LIST.RATING.sortProperty:
      return coll.sort((itemA, itemB) => itemB.rating - itemA.rating);

    case SORT_LIST.DEFAULT.sortProperty:
      return coll;

    default:
      throw new Error(`Unknown order state: '${sort.sortProperty}'!`);
  }
};

export const capitalizeFirstLetter = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export const getRandomElementFromArray = (arr: string[]): string => {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};
