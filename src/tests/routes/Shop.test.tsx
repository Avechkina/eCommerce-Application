import Shop from '@routes/Shop';
import { render, screen } from '@testing-library/react';

describe('Shop', () => {
  it('should render Shop route', () => {
    render(<Shop />);
    expect(screen.getByText(/Shop page/i)).toBeInTheDocument();
  });
});
