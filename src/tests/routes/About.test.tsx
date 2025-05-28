import About from '@routes/About';
import { render, screen } from '@testing-library/react';

describe('About', () => {
  it('should render About route', () => {
    render(<About />);
    expect(screen.getByText(/About page/i)).toBeInTheDocument();
  });
});
