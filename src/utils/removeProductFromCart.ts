import { apiRoot } from '@services/BuildClient';

const removeProductFromCart = (
  ID: string,
  version: number,
  lineItemId: string
) => {
  return apiRoot
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
    })
    .execute();
};

export default removeProductFromCart;
