import useUserStore from '@store/userStore';
import { useEffect } from 'react';

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, [user]);

  return <h1>Profile</h1>;
};

export default UserProfile;
