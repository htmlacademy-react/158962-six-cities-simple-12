import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState, api, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, DEFAULT, Status } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

export type offerSliceState = {
  offers: Offer[];
  city: string;
  status: Status;
}

const initialState: offerSliceState = {
  offers: [],
  city: DEFAULT,
  status: Status.IDLE,
};


export const fetchOffers = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async () => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    } catch (e) {
      toast.error('Cannot get offers');
      throw e;
    }
  }
);

export const offerSlice = createSlice( {
  name: 'offer',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchOffers.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});

export const { changeCity } = offerSlice.actions;
export const selectOfferCards = (state:RootState) => state.offer.offers;
export const selectOffersStatus = (state: RootState) => state.offer.status;
export const selectOffersCity = (state: RootState) => state.offer.city;
export default offerSlice.reducer;
