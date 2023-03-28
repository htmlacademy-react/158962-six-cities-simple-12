import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
//import axios, {AxiosInstance} from 'axios';
import { RootState, api } from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, DEFAULT, Status } from '../../const';

export type offerSliceState = {
  offers: Offer[];
  city: string;
  status: Status;
}

const initialState: offerSliceState = {
  offers: [],
  city: DEFAULT,
  status: Status.LOADING,
};

export const fetchOffers = createAsyncThunk<Offer[]>(
  'data/fetchOffers',
  async () => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  }
);

export const offerSlice = createSlice( {
  name: 'offer',
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },

    setItems(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = Status.LOADING;
      state.offers = [];
    });

    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchOffers.rejected, (state) => {
      state.status = Status.ERROR;
      state.offers = [];
    });
  }
});

export const { changeCity } = offerSlice.actions;
export const selectOfferCards = (state:RootState) => state.offer;
export const getOfferLoadingStatus = (state: RootState) => state.offer.status;
export default offerSlice.reducer;
