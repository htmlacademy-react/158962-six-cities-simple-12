import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {fetchNearbyOffers} from './nearby-offers-slice';
import {RootState} from '../../store';
import {StatusCodes} from 'http-status-codes';
import {makeFakeNearbyOffers} from '../../../utils/mocks';
import {APIRoute} from '../../../const';

const fakeOfferId = 1;
const fakeNearbyOffers = makeFakeNearbyOffers();

describe('Async actions: nearbyOffersSlice', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should load nearby offers when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOfferId}/nearby`)
      .reply(StatusCodes.OK, fakeNearbyOffers);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const {payload} = await store.dispatch(fetchNearbyOffers(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffers.pending.type,
      fetchNearbyOffers.fulfilled.type
    ]);

    expect(payload).toEqual(fakeNearbyOffers);
  });

});
