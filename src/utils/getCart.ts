import { apiRoot } from '@services/BuildClient';

const getCart = (ID: string) => {
  return apiRoot.me().carts().withId({ ID }).get().execute();
};

export default getCart;
