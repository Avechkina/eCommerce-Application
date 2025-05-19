import Header from '@components/Header/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import classes from './ShopLayout.module.css';

const ShopLayout = () => {
  return (
    <Layout className={classes.main}>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default ShopLayout;
