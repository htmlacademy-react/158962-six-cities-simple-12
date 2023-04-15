import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeOffer, makeFakeOffers, makeFakeComments, makeFakeUserData, makeFakeNearbyOffers } from '../../utils/mocks';
import { AuthorizationStatus, Status, NameSpace } from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Room from './room';

const mockStore = configureMockStore([thunk]);

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeComments();
const fakeUserData = makeFakeUserData();
const fakeNearbyOffers = makeFakeNearbyOffers();

describe('Page: Room', () => {
  it('should render correctly all data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        login: '',
        avatar: '',
      },
      [NameSpace.SingleOffer]: {
        status: Status.Success,
        offer: fakeOffer,
      },
      [NameSpace.NearbyOffers]: {
        status: Status.Success,
        offers: fakeNearbyOffers,
      },
      [NameSpace.Comments]: {
        comments: fakeReviews,
        status: Status.Success,
      },
      [NameSpace.Favorites]: {
        favoriteOffers: [],
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly all data received when to Auth', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        login: fakeUserData.email,
        avatar: fakeUserData.avatarUrl,
      },
      [NameSpace.SingleOffer]: {
        status: Status.Success,
        offer: fakeOffer,
      },
      [NameSpace.NearbyOffers]: {
        status: Status.Success,
        offers: fakeNearbyOffers,
      },
      [NameSpace.Comments]: {
        comments: fakeReviews,
        status: Status.Success,
      },
      [NameSpace.Favorites]: {
        favoriteOffers: fakeOffers,
        status: Status.Success,
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly if offers and roomInfo is loading', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        login: '',
        avatar: '',
      },
      [NameSpace.SingleOffer]: {
        status: Status.Loading,
        offer: fakeOffer,
      },
      [NameSpace.NearbyOffers]: {
        offers: [],
      },
      [NameSpace.Comments]: {
        comments: [],
      },
      [NameSpace.Favorites]: {
        favoriteOffers: [],
      },
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Room />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
