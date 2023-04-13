import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import { Offer } from '../../../types/offer';
import {APIRoute, Status, NameSpace } from '../../../const';
import {selectNearbyOffersStatus} from '../nearby-offers-slice/nearby-offers-slice';
import {ThunkOptions} from '../../../types/state';
import {pushNotification} from '../notification-slice/notification-slice';
import {addFavoriteOffer} from '../favorites-slice/favorites-slice';

export type SingleOfferSliceState = {
  offer: Offer | null;
  status: Status;
}

const initialState: SingleOfferSliceState = {
  offer: null,
  status: Status.Idle,
};


export const fetchSingleOffer = createAsyncThunk<Offer, number, ThunkOptions>(
  'data/fetchSingleOffer',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get offer'}));
      throw e;
    }
  }
);

export const singleOfferSlice = createSlice( {
  name: NameSpace.SingleOffer,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchSingleOffer.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchSingleOffer.fulfilled, (state, action) => {
      state.offer = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchSingleOffer.rejected, (state) => {
      state.status = Status.Error;
    });

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      if(state.offer?.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
    });
  }
});


export const selectStatus = (state: RootState) => state[NameSpace.SingleOffer].status;
export const selectSingleOffer = (state: RootState) => state[NameSpace.SingleOffer].offer;

export const selectOfferStatus = createSelector([selectStatus, selectNearbyOffersStatus], (status, nearStatus) => ({
  isLoading: [Status.Loading, Status.Idle].includes(status) || [Status.Loading, Status.Idle].includes(nearStatus),
  isError: status === Status.Error || nearStatus === Status.Error,
  isSuccess: status === Status.Success,
}));

export default singleOfferSlice.reducer;
