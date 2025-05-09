import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import ShopLayout from '@components/ShopLayout/ShopLayout.tsx';
import SignUp from './routes/SignUp.tsx';
import SignIn from './routes/SignIn.tsx';
import NotFound from './routes/404.tsx';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route path="/" element={<App />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
