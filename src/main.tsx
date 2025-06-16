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
import Product from './routes/Product.tsx';
import About from './routes/About.tsx';
import CatalogLayout from '@features/Catalog/CatalogLayout/CatalogLayout.tsx';
import CatalogHome from '@features/Catalog/CatalogHome/CatalogHome.tsx';
import CategoryView from '@features/Catalog/CategoryView/CategoryView.tsx';
import SubcategoryView from '@features/Catalog/SubcategoryView/SubcategoryView.tsx';
import Profile from './routes/Profile.tsx';
import PrivateRoute from '@features/Routing/PrivateRoute.tsx';
import ProfileHome from '@features/UserProfile/ProfileHome/ProfileHome.tsx';
import ProfileAddresses from '@features/UserProfile/ProfileAddresses/ProfileAddresses.tsx';
import Cart from '@routes/Cart.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<ShopLayout />}>
          <Route path="/" element={<App />} />
          <Route path="catalog" element={<CatalogLayout />}>
            <Route index element={<CatalogHome />} />
            <Route path=":categoryName" element={<CategoryView />} />
            <Route
              path=":categoryName/:subcategoryName"
              element={<SubcategoryView />}
            />
            <Route path="product/:productName" element={<Product />} />
            <Route
              path=":categoryName/product/:productName"
              element={<Product />}
            />
            <Route
              path=":categoryName/:subcategoryName/product/:productName"
              element={<Product />}
            />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="basket" element={<Cart />} />
          <Route element={<PublicRoute />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileHome />} />
              <Route path="address" element={<ProfileAddresses />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
