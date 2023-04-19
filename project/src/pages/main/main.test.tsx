import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus, DEFAULT, SORT_LIST, Status, NameSpace } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import Main from './main';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
const fakeOffers = makeFakeOffers();
const fakeStore = {
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
};

describe('Page: Main', () => {

  it('should render correctly if data received and offers are empty', () => {
    const store = mockStore(fakeStore);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  it('should render correctly if data received', () => {
    const store = mockStore({...fakeStore, [NameSpace.Offers]: {...fakeStore[NameSpace.Offers], offers: fakeOffers}});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
  });

  it('should render correctly if status is loading', () => {
    const store = mockStore({
      ...fakeStore, [NameSpace.Offers]: {...fakeStore[NameSpace.Offers],
        status: Status.Loading}
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
