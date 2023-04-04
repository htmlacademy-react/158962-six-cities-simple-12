import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, Status, NameSpace } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {selectNearbyOffersStatus} from './nearby-offers-slice';

export type singleOfferSliceState = {
  offer: Offer | null;
  status: Status;
}

const initialState: singleOfferSliceState = {
  offer: null,
  status: Status.Idle,
};


export const fetchSingleOffer = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchSingleOffer',
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (e) {
      toast.error('Cannot get offer');
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
