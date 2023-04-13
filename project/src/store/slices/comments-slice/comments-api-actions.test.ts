import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {fetchComments, postComment} from './comments-slice';
import {RootState} from '../../store';
import {StatusCodes} from 'http-status-codes';
import {makeFakeComments} from '../../../utils/mocks';
import {APIRoute} from '../../../const';

const fakeOfferId = 1;
const fakeComments = makeFakeComments();

describe('Async actions: commentsSlice', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should load comments when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeComments);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const {payload} = await store.dispatch(fetchComments(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchComments.pending.type,
      fetchComments.fulfilled.type
    ]);

    expect(payload).toEqual(fakeComments);
  });


  it('should send comment when server return 200', async () => {
    const fakeComment = {rating: '5', comment: 'It is a new comment.'};

    mockAPI
      .onPost(`${APIRoute.Comments}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeComment);

    const store = mockStore();

    const {payload} = await store.dispatch(postComment({...fakeComment, id: fakeOfferId}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postComment.pending.type,
      postComment.fulfilled.type
    ]);

    expect(payload).toEqual(fakeComment);
  });

});
