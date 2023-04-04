import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, NameSpace, Status} from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

export type nearbyOffersSliceState = {
  offers: Offer[];
  status: Status;
}

const initialState: nearbyOffersSliceState = {
  offers: [],
  status: Status.Idle,
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
  name: NameSpace.NearbyOffers,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNearbyOffers.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchNearbyOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchNearbyOffers.rejected, (state) => {
      state.status = Status.Error;
    });
  }
});


export const selectNearbyOffersStatus = (state: RootState) => state[NameSpace.NearbyOffers].status;
export const selectNearbyOffers = (state: RootState) => state[NameSpace.NearbyOffers].offers;
export default nearbyOffersSlice.reducer;
