import { Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import CartTable from '../CartTable/CartTable';
import CartCheckoutForm from '../CartCheckoutForm/CartCheckoutForm';
import CartCouponForm from '../CartCouponForm/CartCouponForm';
import classes from './CartLayout.module.css';
import useCartStore from '@store/cartStore';
import EmptyCartMessage from '../EmptyCartMessage/EmptyCartMessage';
import ClearCartButton from '@components/ClearCartButton/ClearCartButton';

const CartLayout = () => {
  const { items } = useCartStore((state) => state);

  return (
    <Layout>
      {items?.length ? (
        <>
          <Title level={2}>Cart</Title>
          <div className={classes.grid}>
            <div className="cart-table">
              <CartTable />
            </div>
            <div className="cart-checkout">
              <CartCheckoutForm />
            </div>
            <div className="clear-button">
              <ClearCartButton />
            </div>
            <div className="coupon-form">
              <CartCouponForm />
            </div>
          </div>
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </Layout>
  );
};

export default CartLayout;
