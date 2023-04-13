import {appSlice, changeSortType} from './app-slice';
import {SORT_LIST} from '../../../const';

describe('Reducer: appSlice', () => {
  it('Should return initial state without additional parameters', () => {
    expect(appSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      sort: {
        name: SORT_LIST.DEFAULT.name,
        sortProperty: SORT_LIST.DEFAULT.sortProperty
      }
    });
  });

  it('changeSort test', () => {
    expect(
      appSlice.reducer(
        {
          sort: {
            name: SORT_LIST.DEFAULT.name,
            sortProperty: SORT_LIST.DEFAULT.sortProperty
          }
        },
        changeSortType(SORT_LIST.PRICE_HIGH)
      )
    ).toEqual({
      sort: {
        name: SORT_LIST.PRICE_HIGH.name,
        sortProperty: SORT_LIST.PRICE_HIGH.sortProperty
      }
    });
  });
});
