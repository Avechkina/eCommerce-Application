import useUserStore from '@store/userStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const PrivateRoute = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/signin', { replace: true });
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return null;
  }

  return <Outlet />;
};

export default PrivateRoute;
