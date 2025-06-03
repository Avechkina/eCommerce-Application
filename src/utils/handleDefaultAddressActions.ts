import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

export const handleDefaultAddressActions = (
  actions: MyCustomerUpdateAction[],
  addressId: string | undefined,
  user: Customer,
  isDefault: {
    shipping: boolean;
    billing: boolean;
  }
) => {
  if (isDefault.shipping) {
    if (addressId !== user.defaultShippingAddressId) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: addressId,
      });
    }
  } else {
    if (addressId === user.defaultShippingAddressId) {
      actions.push({
        action: 'removeShippingAddressId',
        addressId: addressId,
      });
    }
  }

  if (isDefault.billing) {
    if (addressId !== user.defaultBillingAddressId) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: addressId,
      });
    }
  } else {
    if (addressId === user.defaultBillingAddressId) {
      actions.push({
        action: 'removeBillingAddressId',
        addressId: addressId,
      });
    }
  }
};
