import useUserStore from '@store/userStore';
import './App.css';
import { useEffect } from 'react';

function App() {
  const userState = useUserStore((state) => state);

  useEffect(() => {}, [userState]);
  return (
    <>
      <div
        style={{
          flex: 1,
        }}
      >
        <h1>10% OFF all high-end products ($1,000+)</h1>
      </div>
    </>
  );
}

export default App;
