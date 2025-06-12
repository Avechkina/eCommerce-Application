import { apiRoot } from '@services/BuildClient';

const removeProductFromCart = (
  ID: string,
  version: number,
  lineItemId: string
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
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
    });
};

export default removeProductFromCart;
