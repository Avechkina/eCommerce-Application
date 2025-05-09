import useUserStore from '@store/userStore';
import './App.css';
import { useEffect } from 'react';

function App() {
  const id = useUserStore((state) => state.id);

  useEffect(() => {
    console.log(id);
  }, [id]);
  return (
    <>
      <h1>{'ecommerce app'}</h1>
    </>
  );
}

export default App;
