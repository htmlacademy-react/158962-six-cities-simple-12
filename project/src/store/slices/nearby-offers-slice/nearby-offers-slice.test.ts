import {makeFakeNearbyOffers} from '../../../utils/mocks';
import { Status } from '../../../const';
import {NearbyOffersSliceState, nearbyOffersSlice, fetchNearbyOffers} from './nearby-offers-slice';

const fakeNearbyOffers = makeFakeNearbyOffers();

describe('reducer: nearbyOffersSlice', () => {
  let state: NearbyOffersSliceState;

  beforeEach(() => {
    state = {
      offers: [],
      status: Status.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(nearbyOffersSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchNearbyOffers', () => {

    it('should loaded nearby offers if action fulfilled', () => {
      expect(
        nearbyOffersSlice.reducer(state, {
          type: fetchNearbyOffers.fulfilled.type, payload: fakeNearbyOffers
        })
      ).toEqual({...state, offers: fakeNearbyOffers, status: Status.Success});
    });
  });

});
