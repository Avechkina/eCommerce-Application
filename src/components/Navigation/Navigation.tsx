import { NavLink, useNavigate } from 'react-router';
import classes from './Navigation.module.css';
import { Button } from 'antd';

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className={classes.nav}>
      <NavLink to="/">Home</NavLink>
      <Button onClick={() => navigate('/signin')} type="link">
        Sign in
      </Button>
      <Button onClick={() => navigate('/signup')} type="primary">
        Sign up
      </Button>
    </nav>
  );
};

export default Navigation;
