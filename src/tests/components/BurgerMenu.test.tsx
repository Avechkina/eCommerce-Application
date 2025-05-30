import BurgerMenu from '@components/BurgerMenu/BurgerMenu';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

vi.mock('antd', () => ({
  Button: vi.fn(({ children, onClick, type }) => (
    <button data-testid="burger-button" onClick={onClick} data-type={type}>
      {children}
    </button>
  )),
}));

vi.mock('@ant-design/icons', () => ({
  MenuUnfoldOutlined: vi.fn(() => (
    <span data-testid="menu-unfold-icon">☰</span>
  )),
  MenuFoldOutlined: vi.fn(() => <span data-testid="menu-fold-icon">✕</span>),
}));

describe('BurgerMenu', () => {
  it('should render BurgerMenu component', () => {
    render(<BurgerMenu />);

    expect(screen.getByTestId('burger-button')).toBeInTheDocument();
    expect(screen.getByTestId('menu-unfold-icon')).toBeInTheDocument();
  });
  it('should be collapsed by default', () => {
    render(<BurgerMenu />);

    expect(screen.queryByTestId('menu-fold-icon')).not.toBeInTheDocument();
    expect(screen.queryByText(/Home/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Shop/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Product/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/About us/i)).not.toBeInTheDocument();
  });
  it('should toggle menu visibility when burger button is clicked', () => {
    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>
    );

    const burgerButton = screen.getByTestId('burger-button');
    fireEvent.click(burgerButton);

    expect(screen.queryByTestId('menu-fold-icon')).toBeInTheDocument();
    expect(screen.queryByText(/Home/i)).toBeInTheDocument();
    expect(screen.queryByText(/Shop/i)).toBeInTheDocument();
    expect(screen.queryByText(/Product/i)).toBeInTheDocument();
    expect(screen.queryByText(/About us/i)).toBeInTheDocument();
  });
  it('should collapse menu on navlink click', () => {
    render(
      <BrowserRouter>
        <BurgerMenu />
      </BrowserRouter>
    );

    const burgerButton = screen.getByTestId('burger-button');
    fireEvent.click(burgerButton);

    expect(screen.queryByText(/Home/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Home/i));
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.getByTestId('menu-unfold-icon')).toBeInTheDocument();
  });
});
