import { apiRoot } from '@services/BuildClient';

const getProducts = (categoryId?: string, searchText?: string) => {
  if (searchText) {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-US': searchText,
          fuzzy: true,
          fuzzyLevel: 1,
          ...(categoryId && { filter: [`categories.id:"${categoryId}"`] }),
        },
      })
      .execute();
  }
  return apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 9,
        expand: ['productType'],
        ...(categoryId && { where: `categories(id="${categoryId}")` }),
      },
    })
    .execute();
};

export default getProducts;
