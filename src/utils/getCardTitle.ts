import { Customer } from '@commercetools/platform-sdk';

export const getCardTitle = (id: string | undefined, user: Customer) => {
  if (!id) return;
  const isBilling = id === user.defaultBillingAddressId;
  const isShipping = id === user.defaultShippingAddressId;

  if (isBilling && isShipping) {
    return 'Default Billing & Shipping Address';
  }

  if (isBilling) {
    return 'Default Billing Address';
  }

  if (isShipping) {
    return 'Default Shipping Address';
  }

  return;
};
