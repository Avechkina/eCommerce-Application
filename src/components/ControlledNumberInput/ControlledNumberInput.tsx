import useCartStore from '@store/cartStore';
import changeProductQuantityInCart from '@utils/changeProductQuantityInCart';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';
import { InputNumber, message } from 'antd';
import { useState } from 'react';
import { CartDetails } from 'types/cart';

type Props = {
  value: number;
  cartDetails: CartDetails;
  productId: string;
};

const ControlledNumberInput = ({ value, cartDetails, productId }: Props) => {
  const [quantity, setQuantity] = useState<number>(value);
  const { setItems, setOriginalPrice } = useCartStore((state) => state);

  const handleChange = async (newQuantity: number) => {
    try {
      const response = await changeProductQuantityInCart(
        cartDetails.id,
        cartDetails.version,
        productId,
        newQuantity
      );
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
      message.error({
        content: `Failed to change product quantity`,
        duration: 1,
      });
      console.error(error);
    }
  };

  const changeQuantity = async (value: number | null) => {
    if (value === null) {
      return;
    } else {
      setQuantity(value);
      await handleChange(value);
    }
  };

  return (
    <InputNumber
      min={0}
      max={10}
      value={quantity}
      onChange={changeQuantity}
      controls
    />
  );
};

export default ControlledNumberInput;
