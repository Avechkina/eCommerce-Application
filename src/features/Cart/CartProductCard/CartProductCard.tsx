import { CloseOutlined } from '@ant-design/icons';
import useCartStore from '@store/cartStore';
import { formatCartItems } from '@utils/formatCartItems';
import removeProductFromCart from '@utils/removeProductFromCart';
import { Button, Flex, Typography } from 'antd';
import { CartDetails, Product } from 'types/cart';

const { Text } = Typography;

type Props = {
  product: Product;
  cartDetails: CartDetails;
};

const CartProductCard = ({
  product: { id: productId, name, imgUrl },
  cartDetails: { id, version },
}: Props) => {
  const setItems = useCartStore((state) => state.setItems);

  const removeProduct = async () => {
    try {
      const response = await removeProductFromCart(id, version, productId);
      const items = formatCartItems(response.body.lineItems);
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex gap="small">
      <img src={imgUrl} width={80} />
      <Flex vertical align="start" justify="center" gap="small">
        <Text strong>{name}</Text>
        <Button onClick={removeProduct} type="text" icon={<CloseOutlined />}>
          Remove
        </Button>
      </Flex>
    </Flex>
  );
};

export default CartProductCard;
