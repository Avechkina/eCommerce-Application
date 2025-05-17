import useUserStore from '@store/userStore';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const PublicRoute = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (isAuth) {
    return null;
  }

  return <Outlet />;
};

export default PublicRoute;
