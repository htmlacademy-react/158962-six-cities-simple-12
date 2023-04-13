import {createSlice, PayloadAction, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import { Offer } from '../../../types/offer';
import {APIRoute, DEFAULT, NameSpace, Status} from '../../../const';
import {ThunkOptions} from '../../../types/state';
import {pushNotification} from '../notification-slice/notification-slice';
import {addFavoriteOffer} from '../favorites-slice/favorites-slice';

export type OfferSliceState = {
  offers: Offer[];
  city: string;
  status: Status;
}

const initialState: OfferSliceState = {
  offers: [],
  city: DEFAULT,
  status: Status.Idle,
};


export const fetchOffers = createAsyncThunk<Offer[], undefined, ThunkOptions>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get offers'}));
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

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      state.offers.forEach((offer) => {
        if(offer.id === action.payload.id) {
          offer.isFavorite = action.payload.isFavorite;
        }
      });
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
