import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, Status } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

export type nearbyOffersSliceState = {
  offers: Offer[];
  status: Status;
}

const initialState: nearbyOffersSliceState = {
  offers: [],
  status: Status.IDLE,
};


export const fetchNearbyOffers = createAsyncThunk<Offer[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      return data;
    } catch (e) {
      toast.error('Cannot get nearby offers');
      throw e;
    }
  }
);

export const nearbyOffersSlice = createSlice( {
  name: 'nearbyOffers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNearbyOffers.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchNearbyOffers.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});


export const selectNearbyOffersStatus = (state: RootState) => state.nearbyOffers.status;
export  const selectNearbyOffers = (state: RootState) => state.nearbyOffers.offers;
export default nearbyOffersSlice.reducer;
