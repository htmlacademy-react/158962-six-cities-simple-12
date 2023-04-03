import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Review } from '../../types/Review';
import {APIRoute, Status } from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';

export type commentsSliceState = {
  comments: Review[];
  status: Status;
}

export type CommentData = {
  rating: string;
  comment: string;
  id: number;
}

const initialState: commentsSliceState = {
  comments: [],
  status: Status.Idle,
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

export const postComment = createAsyncThunk<Review[], CommentData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({rating,comment, id}, {extra: api}) => {
    try {
      const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {rating, comment});
      return data;
    } catch (e) {
      toast.error('Cannot push comments');
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
      state.status = Status.Loading;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(fetchComments.rejected, (state) => {
      state.status = Status.Error;
    });

    builder.addCase(postComment.pending, (state) => {
      state.status = Status.Loading;
    });

    builder.addCase(postComment.fulfilled, (state, action) => {
      state.comments = action.payload;
      state.status = Status.Success;
    });

    builder.addCase(postComment.rejected, (state) => {
      state.status = Status.Error;
    });
  }
});


export const selectStatus = (state: RootState) => state.comments.status;
export const selectComments = (state: RootState) => state.comments.comments;

export const selectCommentsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
}))
export default commentsSlice.reducer;
