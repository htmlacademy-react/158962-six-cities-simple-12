import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {RootState} from '../../store';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../../const';
import {fetchFavorites} from './favorites-slice';
import { makeFakeOffers } from '../../../utils/mocks';
import { createAPI } from '../../../services/api';

const fakeOffers = makeFakeOffers();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchFavorites when GET /favorites', async () => {

    mockAPI.onGet(APIRoute.Favorite).reply(200, fakeOffers);

    const store = mockStore();

    await store.dispatch(fetchFavorites());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavorites.pending.type,
      fetchFavorites.fulfilled.type,
    ]);
  });

});
