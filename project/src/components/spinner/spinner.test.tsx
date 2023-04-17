import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Spinner />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
