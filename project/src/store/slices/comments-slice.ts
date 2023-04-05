import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import { Review } from '../../types/review';
import {APIRoute, NameSpace, Status} from '../../const';
import dayjs from 'dayjs';
import {ThunkOptions} from '../../types/state';
import {pushNotification} from './notification-slice';

type CommentsSliceState = {
  comments: Review[];
  status: Status;
}

type CommentData = {
  rating: string;
  comment: string;
  id: number;
}

const initialState: CommentsSliceState = {
  comments: [],
  status: Status.Idle,
};


export const fetchComments = createAsyncThunk<Review[], number, ThunkOptions>(
  'data/fetchComments',
  async (offerId, {dispatch, extra: api}) => {
    try {
      const { data } = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot get comments'}));
      throw e;
    }
  }
);

export const postComment = createAsyncThunk<Review[], CommentData, ThunkOptions>(
  'data/postComment',
  async ({rating,comment, id}, {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {rating, comment});
      return data;
    } catch (e) {
      dispatch(pushNotification({type: 'error', message: 'Cannot send comment'}));
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

export const selectSortedComments = createSelector([selectComments], (comments) => (
  [...comments].sort((itemA, itemB) => dayjs(itemB.date).diff(dayjs(itemA.date)))
));
export default commentsSlice.reducer;
