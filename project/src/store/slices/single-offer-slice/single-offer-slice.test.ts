import {makeFakeOffer} from '../../../utils/mocks';
import {Status} from '../../../const';
import {SingleOfferSliceState, fetchSingleOffer, singleOfferSlice} from './single-offer-slice';

const fakeOffer = makeFakeOffer();

describe('reducer: singleOfferSlice', () => {
  let state: SingleOfferSliceState;

  beforeEach(() => {
    state = {
      offer: null,
      status: Status.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(singleOfferSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchSingleOffer', () => {
    it('should update the status to Status.Loading if fetchSingleOffer.pending', () => {
      expect(
        singleOfferSlice.reducer(state, {
          type: fetchSingleOffer.pending.type,
        })
      ).toEqual({ ...state, status: Status.Loading });
    });

    it('should update the status to Success and loaded offer if fetchSingleOffer.fulfilled', () => {
      expect(
        singleOfferSlice.reducer(state, {
          type: fetchSingleOffer.fulfilled.type,
          payload: fakeOffer,
        })
      ).toEqual({
        ...state,
        status: Status.Success,
        offer: fakeOffer,
      });
    });

    it('should update status to "Failed" if action rejected', () => {
      expect(
        singleOfferSlice.reducer(state, {
          type: fetchSingleOffer.rejected.type,
        })
      ).toEqual({ ...state, status: Status.Error });
    });
  });

});
