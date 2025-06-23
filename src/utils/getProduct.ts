import { apiRoot } from '@services/BuildClient';

const getProduct = (id: string) => {
  return apiRoot.productProjections().withId({ ID: id }).get().execute();
};

export default getProduct;
