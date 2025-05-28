import Navigation from '@components/Navigation/Navigation';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

describe('Navigation', () => {
  it('should render navigation component', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
    expect(screen.getByText(/product/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
});
