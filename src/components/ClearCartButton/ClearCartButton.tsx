import { DeleteOutlined } from '@ant-design/icons';
import { MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import useCartStore from '@store/cartStore';
import clearCart from '@utils/clearCart';
import { Button, message, Popconfirm } from 'antd';

const ClearCartButton = () => {
  const { items, cartDetails, resetCart } = useCartStore((state) => state);

  const clearShoppingCart = async () => {
    try {
      if (!items) return;
      const actions: MyCartRemoveLineItemAction[] = items?.map((item) => ({
        action: 'removeLineItem',
        lineItemId: item.product.id,
      }));
      await clearCart(cartDetails.id, cartDetails.version, actions);
      resetCart();
    } catch (error) {
      message.error({
        content: `Failed to clear cart`,
        duration: 1,
      });
      console.error(error);
    }
  };

  return (
    <Popconfirm
      title="Clear cart"
      description="Are you sure to clear this cart?"
      onConfirm={clearShoppingCart}
      okText="Yes"
      cancelText="No"
    >
      <Button
        danger
        style={{ maxWidth: 'fit-content' }}
        icon={<DeleteOutlined />}
      >
        Clear Shopping Cart
      </Button>
    </Popconfirm>
  );
};

export default ClearCartButton;
