import { LineItem } from '@commercetools/platform-sdk';
import { formatPrice } from './formatPrice';

export const getProductPrice = (item: LineItem) => {
  const value = item.price.discounted
    ? item.price.discounted.value.centAmount
    : item.price.value.centAmount;
  const currency = item.price.value.currencyCode;

  return formatPrice(value, currency);
};
