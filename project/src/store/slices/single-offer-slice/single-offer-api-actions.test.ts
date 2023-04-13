import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../../services/api';
import {fetchSingleOffer} from './single-offer-slice';
import {RootState} from '../../store';
import {StatusCodes} from 'http-status-codes';
import {makeFakeOffer} from '../../../utils/mocks';
import {APIRoute} from '../../../const';

const fakeOfferId = 1;
const fakeOffer = makeFakeOffer();

describe('Async actions: singleOffer', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    RootState,
    Action<string>,
    ThunkDispatch<RootState, typeof api, Action>
    >(middlewares);

  it('should loaded single offer when server return 200', async () => {
    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOfferId}`)
      .reply(StatusCodes.OK, fakeOffer);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const {payload} = await store.dispatch(fetchSingleOffer(fakeOfferId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSingleOffer.pending.type,
      fetchSingleOffer.fulfilled.type
    ]);

    expect(payload).toEqual(fakeOffer);
  });

});
