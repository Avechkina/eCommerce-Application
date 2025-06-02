import { apiRoot } from '@services/BuildClient';

const getCategories = () => {
  return apiRoot.categories().get().execute();
};

export default getCategories;
