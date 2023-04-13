import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {fetchOffers} from './offer-slice';
import {RootState} from '../../store';
import {StatusCodes} from 'http-status-codes';
import {makeFakeOffers} from '../../../utils/mocks';
import {APIRoute} from '../../../const';

const fakeOffers = makeFakeOffers();

describe('Async actions: offersSlice', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should load offers when server return 200', async () => {
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(StatusCodes.OK, fakeOffers);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const {payload} = await store.dispatch(fetchOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type
    ]);

    expect(payload).toEqual(fakeOffers);
  });
});
