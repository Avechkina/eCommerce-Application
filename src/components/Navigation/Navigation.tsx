import { NavLink, useNavigate } from 'react-router';
import classes from './Navigation.module.css';
import { Button } from 'antd';
import useUserStore from '@store/userStore';

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);

  return (
    <nav className={classes.nav}>
      <NavLink to="/">Home</NavLink>
      {isAuth ? (
        <Button type="link">Sign out</Button>
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
