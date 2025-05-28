import Product from '@routes/Product';
import { render, screen } from '@testing-library/react';

describe('Product', () => {
  it('should render Product route', () => {
    render(<Product />);
    expect(screen.getByText(/Product page/i)).toBeInTheDocument();
  });
});
