import {createSlice, PayloadAction, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState, api, AppDispatch} from '../store';
import { Offer } from '../../types/Offer';
import {APIRoute, DEFAULT, NameSpace, Status} from '../../const';
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
  status: Status.Idle,
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
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchOffers.rejected, (state) => {
      state.status = Status.Error;
    });
  }
});

export const { changeCity } = offerSlice.actions;
export const selectOfferCards = (state:RootState) => state[NameSpace.Offers].offers;
export const selectStatus = (state: RootState) => state[NameSpace.Offers].status;
export const selectOffersCity = (state: RootState) => state[NameSpace.Offers].city;

export const selectOffersStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));
export default offerSlice.reducer;
