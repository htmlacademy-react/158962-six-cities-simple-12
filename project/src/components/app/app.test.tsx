import {Action} from 'redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import {AppRoute, AuthorizationStatus, Status, NameSpace, SORT_LIST} from '../../const';
import {makeFakeNearbyOffers, makeFakeOffer, makeFakeOffers, makeFakeComments, makeFakeUserData} from '../../utils/mocks';
import App from './app';
import {RootState} from '../../store/store';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../../services/api';
import {generatePath} from 'react-router-dom';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeNearOffers = makeFakeNearbyOffers();
const fakeReviews = makeFakeComments();
const fakeUserData = makeFakeUserData();

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<RootState,
  Action<string>,
  ThunkDispatch<RootState, typeof api, Action>>(middlewares);

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    login: '',
    avatar: '',
  },
  [NameSpace.Sorting]: {
    sort: {
      name: SORT_LIST.DEFAULT.name,
      sortProperty: SORT_LIST.DEFAULT.sortProperty
    }
  },
  [NameSpace.Favorites]: {
    favoriteOffers: fakeOffers,
    status: Status.Success,
  },
  [NameSpace.Offers]: {
    offers: fakeOffers,
    status: Status.Success,
  },
  [NameSpace.SingleOffer]: {
    offer: fakeOffer,
    status: Status.Success,
  },

  [NameSpace.NearbyOffers]: {
    offers: fakeNearOffers,
    status: Status.Success,
  },

  [NameSpace.Comments]: {
    comments: fakeReviews,
    sendCommentStatus: Status.Success,
  },
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainPage" when user navigate to "/" route', () => {
    history.push(AppRoute.Root);
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render "RoomPage" when user navigate to "/offer"', () => {
    history.push(generatePath(AppRoute.Offer, {id: `${fakeOffer.id}`}));
    window.scrollTo = jest.fn();

    render(fakeApp);

    expect(screen.getByTestId('room-page')).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const state = store.getState();
    window.scrollTo = jest.fn();

    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      login: fakeUserData.email,
      avatar: fakeUserData.avatarUrl,
    };

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render "not found page" when user navigate to "*" route', () => {
    history.push('/non-existent_address');

    render(fakeApp);
    expect(screen.getByText('Oops, this page does not exists')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
