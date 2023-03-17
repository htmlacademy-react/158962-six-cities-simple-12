import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Offer } from '../../types/Offer';
import { offers } from '../../mocks/offers';
import { CITIES } from '../../const';

const [CITY_BY_DEFAULT, ] = CITIES;

export type offerSliceState = {
  offers: Offer[];
  city: string;
}

const initialState: offerSliceState = {
  offers: offers,
  city: CITY_BY_DEFAULT,
};

export const offerSlice = createSlice( {
  name: 'offer',
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  }
});

export const { setActiveCity } = offerSlice.actions;
export const selectOfferCards = (state:RootState) => state.offer;
export default offerSlice.reducer;
