import { apiRoot } from '@services/BuildClient';

const getCart = () => {
  return apiRoot.me().carts().get().execute();
};

export default getCart;
