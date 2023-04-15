import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {AuthorizationStatus, DEFAULT, SORT_LIST, Status, NameSpace} from '../../const';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import Main from './main';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();

describe('Page: Main', () => {

  it('should render correctly if data received and offers are empty', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth
      },
      [NameSpace.Offers]: {
        offers: [],
        city: DEFAULT,
        status: Status.Success,
      },
      [NameSpace.Favorites]: {
        favoriteOffers: [],
        status: Status.Success,
      },
      [NameSpace.Sorting]: {
        sort: {
          name: SORT_LIST.DEFAULT.name,
          sortProperty: SORT_LIST.DEFAULT.sortProperty
        }
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('should render correctly if data received', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        login: fakeUserData.email,
        avatar: fakeUserData.avatarUrl,
      },
      [NameSpace.Offers]: {
        offers: fakeOffers,
        city: DEFAULT,
        status: Status.Success,
      },
      [NameSpace.Sorting]: {
        sort: {
          name: SORT_LIST.DEFAULT.name,
          sortProperty: SORT_LIST.DEFAULT.sortProperty
        },
      },
      [NameSpace.Favorites]: {
        favoriteOffers: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

});
