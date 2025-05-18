import { NavLink, useNavigate } from 'react-router';
import classes from './Navigation.module.css';
import { Button } from 'antd';
import useUserStore from '@store/userStore';

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);
  const updateId = useUserStore((state) => state.updateId);
  const handleSignoutButtonClick = () => {
    updateId('', false);
  };
  return (
    <nav className={classes.nav}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/product">Product</NavLink>
      <NavLink to="/about">About us</NavLink>
      {isAuth ? (
        <Button onClick={handleSignoutButtonClick} type="link">
          Sign out
        </Button>
      ) : (
        <>
          {' '}
          <Button onClick={() => navigate('/signin')} type="link">
            Sign in
          </Button>
          <Button onClick={() => navigate('/signup')} type="primary">
            Sign up
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
