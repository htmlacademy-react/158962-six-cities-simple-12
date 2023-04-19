import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { makeFakeOffer, makeFakeOffers, makeFakeComments, makeFakeUserData, makeFakeNearbyOffers } from '../../utils/mocks';
import { AuthorizationStatus, Status, NameSpace } from '../../const';
import Room from './room';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);

const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeUserData = makeFakeUserData();
const fakeReviews = makeFakeComments();
const fakeNearbyOffers = makeFakeNearbyOffers();
const fakeStore = {
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
};

describe('Page: Room', () => {
  it('should render correctly all data received', () => {
    const store = mockStore(fakeStore);

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Room />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly all data received when Auth', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.User]: {
        ...fakeStore[NameSpace.User],
        authorizationStatus: AuthorizationStatus.Auth,
        login: fakeUserData.email,
        avatar: fakeUserData.avatarUrl
      },
      [NameSpace.Favorites]: {...fakeStore[NameSpace.Favorites], favoriteOffers: fakeOffers}});

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Room />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render correctly if status is loading', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.SingleOffer]: {...fakeStore[NameSpace.SingleOffer], status: Status.Loading,}
    });

    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Room />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
