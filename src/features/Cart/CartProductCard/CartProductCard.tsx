import { CloseOutlined } from '@ant-design/icons';
import useCartStore from '@store/cartStore';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';
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
  const { setItems, setOriginalPrice } = useCartStore((state) => state);

  const removeProduct = async () => {
    try {
      const response = await removeProductFromCart(id, version, productId);
      const items = formatCartItems(response.body.lineItems);
      const totalPrice = response.body.totalPrice;
      const subtotal = formatPrice(
        totalPrice.centAmount,
        totalPrice.currencyCode
      );
      setItems(items, subtotal);
      const discount =
        response.body.discountOnTotalPrice?.discountedAmount.centAmount;
      if (discount) {
        const originalPrice = formatPrice(
          totalPrice.centAmount + discount,
          totalPrice.currencyCode
        );
        setOriginalPrice(originalPrice);
      }
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
