import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <HistoryRouter history={history}>
        <Spinner />
      </HistoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
