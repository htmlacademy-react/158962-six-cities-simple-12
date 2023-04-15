import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import {AuthorizationStatus, Status, NameSpace} from '../../const';
import HistoryRouter from '../../components/history-route/history-route';
import Favorites from './favorites';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

describe('Page: Favorites', () => {
  it('should render correctly if favoriteOffers are empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favoriteOffers: [],
        status: Status.Success,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        login: '',
        avatar: '',
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Favorites]: {
        favoriteOffers: fakeOffers,
        status: Status.Success,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        login: fakeUserData.email,
        avatar: fakeUserData.avatarUrl,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
