import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {checkAuthAction, loginAction, logoutAction, AuthData} from './user-slice';
import {RootState} from '../../store';
import {makeFakeUserData} from '../../../utils/mocks';
import {StatusCodes} from 'http-status-codes';
import {APIRoute} from '../../../const';
import {fetchFavorites} from '../favorites-slice/favorites-slice';
import {AUTH_TOKEN_KEY_NAME} from '../../../services/token';
import {redirectToRoute} from '../../action';

const fakeUserData = makeFakeUserData();

describe('Async actions: userData', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should authorization status is "AUTH" and load userData when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);


    const {payload} = await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      fetchFavorites.pending.type,
      checkAuthAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);
  });

  it('should save token and load userData when POST /login', async () => {
    const fakeUser: AuthData = {
      login: 'test@test.ru',
      password: '123456h'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCodes.OK, fakeUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    const{payload} = await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      fetchFavorites.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeUserData);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeUserData.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCodes.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
