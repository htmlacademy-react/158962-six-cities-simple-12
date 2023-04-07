import {APIRoute, NameSpace, Status} from '../../const';
import {Offer} from '../../types/offer';
import {createAsyncThunk, createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThunkOptions} from '../../types/state';
import {RootState} from '../store';
import {pushNotification} from './notification-slice';

type FavoritesSliceState = {
  favoriteOffers: Offer[],
  status: Status,
}

const initialState: FavoritesSliceState = {
  favoriteOffers: [],
  status: Status.Idle,
}

export const fetchFavorites = createAsyncThunk<Offer[], undefined, ThunkOptions>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Favorite);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get favorite offers'}));
      throw e;
    }
  }
)

export const addFavoriteOffer = createAsyncThunk<Offer, Offer, ThunkOptions>(
  'data/addFavorites',
  async ({id, isFavorite}, {dispatch, extra: api}) => {
    try {
      console.log('status-before:', Number(!isFavorite))
      const status = Number(!isFavorite);
      console.log('status-after:', status)
      const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${status}`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot add offer in favorite'}));
      throw e;
    }
  }
)



export const favoritesSlice = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.status = Status.Success;
      state.favoriteOffers = action.payload;
    });

    builder.addCase(fetchFavorites.rejected, (state) => {
      state.status = Status.Error;
    });

    builder.addCase(addFavoriteOffer.fulfilled, (state, action) => {
      state.favoriteOffers.push(action.payload);
      state.favoriteOffers = state.favoriteOffers.filter((item) => item.id !== action.payload.id);
      /*state.favoriteOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          return offer.isFavorite = action.payload.isFavorite;
        }
      })*/

    });

  }
})

export const selectFetchStatus = (state: RootState) => state[NameSpace.Favorites].status;
export const selectFavoritesItems = (state: RootState) => state[NameSpace.Favorites].favoriteOffers;

export const selectFavoriteStatus = createSelector([selectFetchStatus], (status) => ({
  isLoading: status === Status.Loading,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export default favoritesSlice.reducer;
