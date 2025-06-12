import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

const getCart = (apiRoot: ByProjectKeyRequestBuilder) => {
  return apiRoot.me().carts().get().execute;
};

export default getCart;
