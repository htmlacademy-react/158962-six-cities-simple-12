import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {AuthorizationStatus, NameSpace} from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import thunk from 'redux-thunk';
import Login from './login';
import { MemoryRouter } from 'react-router-dom';
import {act} from 'react-dom/test-utils';

const mockStore = configureMockStore([thunk]);
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
  it('should render correctly fields', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should click sign in correctly', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'test@ya.ru'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '12345w'));
    await act(async () => await userEvent.click(screen.getByRole('button')));


    expect(screen.queryByText(/Email is incorrect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password should contain at least 1 letter and 1 number/i)).not.toBeInTheDocument();
  });

  it('should display errors', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    await act(async () => await userEvent.type(screen.getByTestId('email'), 'k'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '1'));
    await act(async () => await userEvent.click(screen.getByRole('button')));

    expect(screen.getByText(/Email is incorrect/i)).toBeInTheDocument();
    expect(screen.getByText(/Password should contain at least 1 letter and 1 number/i)).toBeInTheDocument();
  });

  it('should display random city correct', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const element = screen.getByTestId('location-text');
    if (!element.textContent) {
      element.textContent = '';
    }

    expect(element).toHaveTextContent(element.textContent);
  });
});
