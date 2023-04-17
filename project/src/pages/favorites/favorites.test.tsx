import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import { AuthorizationStatus, Status, NameSpace } from '../../const';
import Favorites from './favorites';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeUserData = makeFakeUserData();
const fakeStore = {
  [NameSpace.Favorites]: {
    favoriteOffers: [],
    status: Status.Success,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    login: '',
    avatar: '',
  },
};

describe('Page: Favorites', () => {
  it('should render correctly if favoriteOffers are empty', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render correctly when favorites are received', () => {
    const store = mockStore({
      ...fakeStore,
      [NameSpace.Favorites]: {...fakeStore[NameSpace.Favorites], favoriteOffers: fakeOffers},
      [NameSpace.User]: {
        ...fakeStore[NameSpace.User],
        authorizationStatus: AuthorizationStatus.Auth,
        login: fakeUserData.email,
        avatar: fakeUserData.avatarUrl
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
