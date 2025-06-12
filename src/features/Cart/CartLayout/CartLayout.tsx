import { Flex, Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import CartTable from '../CartTable/CartTable';
import CartCheckoutForm from '../CartCheckoutForm/CartCheckoutForm';
import CartCouponForm from '../CartCouponForm/CartCouponForm';

const CartLayout = () => {
  return (
    <Layout>
      <Title level={2}>Cart</Title>
      <Flex>
        <CartTable />
        <CartCheckoutForm />
      </Flex>
      <CartCouponForm />
    </Layout>
  );
};

export default CartLayout;
