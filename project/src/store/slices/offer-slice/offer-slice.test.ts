import {makeFakeOffers} from '../../../utils/mocks';
import {OfferSliceState, offerSlice, fetchOffers, changeCity} from './offer-slice';
import { Status, DEFAULT, CITIES } from '../../../const';

const fakeOffers = makeFakeOffers();

describe('reducer: offerSlice', () => {
  let state: OfferSliceState;

  beforeEach(() => {
    state = {
      offers: [],
      city: DEFAULT,
      status: Status.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(offerSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('changeCity test', () => {
    expect(
      offerSlice.reducer(
        {offers: [], city: DEFAULT, status: Status.Idle},
        changeCity(CITIES[1])
      )
    ).toEqual({offers: [], city: CITIES[1], status: Status.Idle});
  });

  describe('Action: fetchOffers', () => {
    it('should update the Status to Status.Loading if fetchOffers.pending', () => {
      expect(
        offerSlice.reducer(state, {
          type: fetchOffers.pending.type,
        })
      ).toEqual({ ...state, city: DEFAULT, status: Status.Loading });
    });

    it('should update the status to Status.Success and loaded offers if Status.fulfilled', () => {
      expect(
        offerSlice.reducer(state, {
          type: fetchOffers.fulfilled.type,
          payload: fakeOffers,
        })
      ).toEqual({
        ...state,
        status: Status.Success,
        city: DEFAULT,
        offers: fakeOffers,
      });
    });
  });
});
