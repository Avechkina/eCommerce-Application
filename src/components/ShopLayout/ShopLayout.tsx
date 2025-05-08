import LayoutHeader from '@components/Header/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router';

const ShopLayout = () => {
  return (
    <Layout>
      <LayoutHeader />
      <Outlet />
    </Layout>
  );
};

export default ShopLayout;
