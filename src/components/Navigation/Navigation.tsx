import { NavLink, useNavigate } from 'react-router';
import classes from './Navigation.module.css';
import { Button, Tooltip } from 'antd';
import useUserStore from '@store/userStore';
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import BurgerMenu from '@components/BurgerMenu/BurgerMenu';

const Navigation = () => {
  const navigate = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);
  const updateId = useUserStore((state) => state.updateId);
  const handleSignoutButtonClick = () => {
    updateId('', false);
  };

  return (
    <nav className={classes.nav}>
      <BurgerMenu />
      <h2 className={classes.logo} onClick={() => navigate('/')}>
        FutureTech.
      </h2>
      <div className={classes.link_wrapper}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/product">Product</NavLink>
        <NavLink to="/about">About us</NavLink>
      </div>
      <div className={classes.icon_wrapper}>
        {isAuth ? (
          <Tooltip title="Sign out">
            <Button
              icon={<LogoutOutlined />}
              onClick={handleSignoutButtonClick}
              type="link"
            ></Button>
          </Tooltip>
        ) : (
          <>
            {' '}
            <Tooltip title="Sign in">
              <Button
                icon={<LoginOutlined />}
                onClick={() => navigate('/signin')}
                type="link"
              ></Button>
            </Tooltip>
            <Tooltip title="Sign up">
              <Button
                icon={<UserAddOutlined />}
                onClick={() => navigate('/signup')}
                type="link"
              ></Button>
            </Tooltip>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
