import { apiRoot } from '@services/BuildClient';

const addProductToCart = (
  ID: string,
  version: number,
  productId: string,
  quantity: number
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
            action: 'addLineItem',
            productId,
            quantity,
          },
        ],
      },
    })
    .execute();
};

export default addProductToCart;
