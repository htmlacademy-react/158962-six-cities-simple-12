import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState, AppDispatch} from '../store';
import { Review } from '../../types/Review';
import {APIRoute, NameSpace, Status} from '../../const';
import {AxiosInstance} from 'axios';
import {toast} from 'react-toastify';
import {sortByDate} from '../../utils';

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
      const { data } = await api.post<Review[]>(`${APIRoute.Comments}${id}`, {rating, comment});
      return data;
    } catch (e) {
      toast.error('Cannot send comment');
      throw e;
    }
  }
);

export const commentsSlice = createSlice( {
  name: NameSpace.Comments,
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


export const selectStatus = (state: RootState) => state[NameSpace.Comments].status;
export const selectComments = (state: RootState) => state[NameSpace.Comments].comments;

export const selectCommentsStatus = createSelector([selectStatus], (status) => ({
  isLoading: status === Status.Loading || status === Status.Idle,
  isError: status === Status.Error,
  isSuccess: status === Status.Success,
}));

export const selectSortedComments = createSelector([selectComments], (comments) => ({
  comments: sortByDate([...comments]).slice(0, 10),
}));
export default commentsSlice.reducer;
