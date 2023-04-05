export type SortItem = {
  name: string;
  sortProperty: string;
}

export type Sort = {
  DEFAULT: SortItem;
  PRICE_HIGH: SortItem;
  PRICE_LOW: SortItem;
  RATING: SortItem;
}
