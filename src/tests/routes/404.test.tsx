import NotFound from '@routes/404';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

vi.mock('antd', () => ({
  Button: vi.fn(({ children, onClick, type }) => (
    <button data-testid="burger-button" onClick={onClick} data-type={type}>
      {children}
    </button>
  )),
}));

const mockNavigate = vi.fn();

vi.mock(import('react-router'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFound', () => {
  it('should render NotFound route', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByTestId('burger-button')).toBeInTheDocument();
    expect(screen.getByText(/NotFound/i)).toBeInTheDocument();
  });
  it('should call navigate on button click', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const button = screen.getByTestId('burger-button');
    fireEvent.click(button);

    expect(mockNavigate).toBeCalled();
  });
});
