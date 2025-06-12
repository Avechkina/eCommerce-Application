import { apiRoot } from '@services/BuildClient';

const changeProductQuantityInCart = (
  ID: string,
  version: number,
  lineItemId: string,
  quantity: number
) => {
  apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      },
    });
};

export default changeProductQuantityInCart;
