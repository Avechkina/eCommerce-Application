import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import CartTable from '../CartTable/CartTable';
import CartCheckoutForm from '../CartCheckoutForm/CartCheckoutForm';
import CartCouponForm from '../CartCouponForm/CartCouponForm';
import classes from './CartLayout.module.css';

const CartLayout = () => {
  return (
    <Layout>
      <Title level={2}>Cart</Title>
      <div className={classes.grid}>
        <CartTable />
        <CartCheckoutForm />
        <CartCouponForm />
      </div>
    </Layout>
  );
};

export default CartLayout;
