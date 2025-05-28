import { apiRoot } from '@services/BuildClient';

const getProducts = () => {
  return apiRoot.productProjections().get().execute();
};

export default getProducts;
