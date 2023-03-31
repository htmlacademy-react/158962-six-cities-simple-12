import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Review } from '../../types/Review';
import {APIRoute, Status } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

export type commentsSliceState = {
  comments: Review[];
  status: Status;
}

const initialState: commentsSliceState = {
  comments: [],
  status: Status.IDLE,
};


export const fetchComments = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, {extra: api}) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      return data;
    } catch (e) {
      toast.error('Cannot get comments');
      throw e;
    }
  }
);

export const commentsSlice = createSlice( {
  name: 'comments',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.status = Status.ERROR;
    });
  }
});


export const selectCommentsStatus = (state: RootState) => state.comments.status;
export const selectComments = (state: RootState) => state.comments.comments;
export default commentsSlice.reducer;
