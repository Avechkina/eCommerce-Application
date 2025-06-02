import { apiRoot } from '@services/BuildClient';

const getProducts = (categoryId: string) => {
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 9,
        ...(categoryId && { where: `categories(id="${categoryId}")` }),
      },
    })
    .execute();
};

export default getProducts;
