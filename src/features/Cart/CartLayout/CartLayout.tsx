import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import CartTable from '../CartTable/CartTable';
import CartCheckoutForm from '../CartCheckoutForm/CartCheckoutForm';
import CartCouponForm from '../CartCouponForm/CartCouponForm';
import classes from './CartLayout.module.css';
import useCartStore from '@store/cartStore';
import EmptyCartMessage from '../EmptyCartMessage/EmptyCartMessage';

const CartLayout = () => {
  const items = useCartStore((state) => state.items);

  return (
    <Layout>
      {items?.length ? (
        <>
          <Title level={2}>Cart</Title>
          <div className={classes.grid}>
            <CartTable />
            <CartCheckoutForm />
            <CartCouponForm />
          </div>
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </Layout>
  );
};

export default CartLayout;
