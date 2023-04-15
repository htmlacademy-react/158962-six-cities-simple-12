import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import {AuthorizationStatus, NameSpace} from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import thunk from 'redux-thunk';
import Login from './login';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeOffers = makeFakeOffers();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  },
  [NameSpace.Offers]: {
    offers: fakeOffers
  },
  [NameSpace.Favorites]: {
    favoriteOffers: [],
  },
});

describe('Component: Login', () => {
  it('should render correctly and type email/password', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'keks@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456a');

    expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456a/i)).toBeInTheDocument();
  });

  it('should click sign in correctly', async () => {
    const fakeSingIn = jest.fn();
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'keks@mail.ru');
    await userEvent.type(screen.getByTestId('password'), '123456a');

    expect(screen.getByTestId('login-submit')).toBeInTheDocument();
    screen.getByTestId('form-submit').onsubmit = fakeSingIn;
    await userEvent.click(screen.getByTestId('login-submit'));
    expect(fakeSingIn).toBeCalledTimes(1);
  });
});
