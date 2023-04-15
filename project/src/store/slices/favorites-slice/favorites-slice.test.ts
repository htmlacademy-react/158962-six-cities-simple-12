import {Status} from '../../../const';
import {FavoritesSliceState, fetchFavorites, favoritesSlice, addFavoriteOffer} from './favorites-slice';
import { makeFakeOffer, makeFakeOffers } from '../../../utils/mocks';
import {logoutAction} from '../user-slice/user-slice';

let fakeOffers = makeFakeOffers();

describe('Reducer: favoritesSlice', () => {
  let state: FavoritesSliceState;

  beforeEach(() => {
    state = {
      favoriteOffers: [],
      status: Status.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(favoritesSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      favoriteOffers: [],
      status: Status.Idle,
    });
  });

  describe('fetchFavorites test', () => {
    it('fetchFavorites fulfilled', () => {

      expect(
        favoritesSlice.reducer(state, {
          type: fetchFavorites.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual({
        favoriteOffers: fakeOffers,
        status: Status.Success,
      });
    });

    it('fetchFavorites rejected', () => {
      expect(
        favoritesSlice.reducer(state, {
          type: fetchFavorites.rejected.type,
        })
      ).toEqual({
        favoriteOffers: [],
        status: Status.Error,
      });
    });
  });

  describe('addFavoriteOffer test', () => {
    it('addFavoriteOffer fulfilled', () => {
      const fakeNewOffer = makeFakeOffer();

      if (fakeNewOffer.isFavorite) {
        fakeOffers = [...fakeOffers, fakeNewOffer];
      } else {
        fakeOffers.filter((offer) => offer.id !== fakeNewOffer.id);
      }

      expect(
        favoritesSlice.reducer(state, { type: addFavoriteOffer.fulfilled.type, payload: fakeOffers })
      ).toEqual({
        favoriteOffers: [],
        status: Status.Idle,
      });
    });
  });

  describe('logoutAction test', () => {
    it('logoutAction fulfilled', () => {
      expect(
        favoritesSlice.reducer(state, { type: logoutAction.fulfilled.type })
      ).toEqual({
        favoriteOffers: [],
        status: Status.Idle,
      });
    });
  });
});
