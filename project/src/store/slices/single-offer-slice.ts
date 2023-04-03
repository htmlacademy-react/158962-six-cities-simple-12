import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, Status } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

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
  name: 'singleOffer',
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


export const selectSingleOfferStatus = (state: RootState) => state.singleOffer.status;
export const selectSingleOffer = (state: RootState) => state.singleOffer.offer;
export default singleOfferSlice.reducer;
