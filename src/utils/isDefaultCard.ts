import { Customer } from '@commercetools/platform-sdk';

export const isDefaultCard = (
  id: string | undefined,
  user: Customer | undefined
) => {
  const isBilling = id === user?.defaultBillingAddressId;
  const isShipping = id === user?.defaultShippingAddressId;

  if (isBilling || isShipping) {
    return true;
  }

  return false;
};
