import useUserStore from '@store/userStore';
import './App.css';
import { useEffect } from 'react';

function App() {
  const userState = useUserStore((state) => state);

  useEffect(() => {
    console.log(userState);
  }, [userState]);
  return (
    <>
      <h1>{'ecommerce app'}</h1>
    </>
  );
}

export default App;
