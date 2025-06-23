import { apiRoot } from '@services/BuildClient';

const applyDiscountCode = (ID: string, version: number, code: string) => {
  return apiRoot
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      },
    })
    .execute();
};

export default applyDiscountCode;
