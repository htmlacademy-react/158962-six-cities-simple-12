import {makeFakeComments} from '../../../utils/mocks';
import {Status} from '../../../const';
import {commentsSlice, CommentsSliceState, fetchComments, postComment} from './comments-slice';

const fakeComments = makeFakeComments();

describe('reducer: commentsSlice', () => {
  let state: CommentsSliceState;

  beforeEach(() => {
    state = {
      comments: [],
      sendCommentStatus: Status.Idle,
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(commentsSlice.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe('Action: fetchComments', () => {
    it('should loaded comments if action fulfilled', () => {
      expect(
        commentsSlice.reducer(state, {
          type: fetchComments.fulfilled.type, payload: fakeComments
        })
      ).toEqual({...state, comments: fakeComments});
    });
  });

  describe('Action: postComment', () => {

    it('should update form block if action pending', () => {
      expect(commentsSlice.reducer(state, {type: postComment.pending.type}))
        .toEqual({...state, sendCommentStatus: Status.Loading});
    });

    it('should update form block status to "Success" if action fulfilled', () => {
      expect(commentsSlice.reducer(state, {type: postComment.fulfilled.type, payload: fakeComments}))
        .toEqual({...state, sendCommentStatus: Status.Success, comments: fakeComments});
    });

    it('should update form block status to "Failed" if action rejected', () => {
      expect(commentsSlice.reducer(state, {type: postComment.rejected.type}))
        .toEqual({...state, sendCommentStatus: Status.Error});
    });
  });
});
