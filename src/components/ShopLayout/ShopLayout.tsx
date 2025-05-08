import Header from '@components/Header/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router';

const ShopLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default ShopLayout;
