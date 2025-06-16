import { MyCartRemoveLineItemAction } from '@commercetools/platform-sdk';
import { apiRoot } from '@services/BuildClient';

const clearCart = (
  ID: string,
  version: number,
  actions: MyCartRemoveLineItemAction[]
) => {
  return apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
};

export default clearCart;
