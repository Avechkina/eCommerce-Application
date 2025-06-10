import { apiRoot } from '@services/BuildClient';

const getProducts = (
  categoryId?: string,
  searchText?: string,
  sortValue?: string
) => {
  if (searchText) {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-US': searchText,
          fuzzy: true,
          fuzzyLevel: 1,
          limit: 9,
          ...(categoryId && { filter: [`categories.id:"${categoryId}"`] }),
        },
      })
      .execute();
  }

  if (sortValue) {
    return apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: `${sortValue}`,
          limit: 9,
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
