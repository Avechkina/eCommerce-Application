import { apiRoot } from '@services/BuildClient';

const createCart = (currency = 'USD') => {
  return apiRoot.me().carts().post({ body: { currency } }).execute();
};

export default createCart;
