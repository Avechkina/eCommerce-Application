import Header from '@components/Header/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router';
import classes from './ShopLayout.module.css';
import DiscountBanner from '@components/DiscountBanner/DiscountBanner';
import { PROMOCODE } from '@utils/constants';

const ShopLayout = () => {
  const message = `🎉 Save ${parseInt('SAVE20'.replace(/\D/g, ''))}% on your entire order with code ${PROMOCODE}!`;

  return (
    <Layout className={classes.main}>
      <Header />
      <DiscountBanner message={message} />
      <Outlet />
    </Layout>
  );
};

export default ShopLayout;
