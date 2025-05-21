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
import PublicRoute from '@features/Routing/PublicRoute.tsx';
import Shop from './routes/Shop.tsx';
import Product from './routes/Product.tsx';
import About from './routes/About.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route path="/" element={<App />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product" element={<Product />} />
          <Route path="about" element={<About />} />
          <Route element={<PublicRoute />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
