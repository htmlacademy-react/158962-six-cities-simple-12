import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState} from '../store';
import { Offer } from '../../types/offer';
import {APIRoute, NameSpace, Status} from '../../const';
import {ThunkOptions} from '../../types/state';
import {pushNotification} from './notification-slice';

type nearbyOffersSliceState = {
  offers: Offer[];
  status: Status;
}

const initialState: nearbyOffersSliceState = {
  offers: [],
  status: Status.Idle,
};


export const fetchNearbyOffers = createAsyncThunk<Offer[], number, ThunkOptions>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get nearby offers'}));
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
