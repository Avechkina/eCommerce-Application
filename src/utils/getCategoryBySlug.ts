import { apiRoot } from '@services/BuildClient';

const getCategoryIdBySlug = (slug: string, locale: string = 'en-US') => {
  return apiRoot
    .categories()
    .get({
      queryArgs: {
        where: `slug(${locale}="${slug}")`,
        limit: 1,
      },
    })
    .execute();
};

export default getCategoryIdBySlug;
