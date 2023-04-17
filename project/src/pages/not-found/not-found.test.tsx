import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { MemoryRouter } from 'react-router-dom';

describe('Component: NotFound', () => {
  it('should render correctly', () => {

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText('Oops, this page does not exists')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});

