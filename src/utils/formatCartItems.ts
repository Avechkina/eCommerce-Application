import { LineItem } from '@commercetools/platform-sdk';
import { getProductPrice } from './getProductPrice';
import { formatPrice } from './formatPrice';
import { CartItem } from 'types/cart';

export const formatCartItems = (items: LineItem[]): CartItem[] => {
  return items.map((item) => ({
    key: item.id,
    product: {
      id: item.id,
      name: item.name['en-US'],
      imgUrl: item.variant.images && item.variant.images[0].url,
    },
    quantity: item.quantity,
    price: getProductPrice(item),
    subtotal: formatPrice(
      item.totalPrice.centAmount,
      item.totalPrice.currencyCode
    ),
  }));
};
