import getCategories from '@utils/getCategories';
import { Breadcrumb } from 'antd';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import classes from './Breadcrumbs.module.css';

type TCategoryProps = {
  id: string;
  key?: string;
  name: string;
  slug?: string;
  parent?: string;
};

type TBreadcrumbItem = {
  key: string;
  title: string;
  onClick?: MouseEventHandler;
  className?: string;
};

type TBreadcrumbMap = Record<string, string>;

export const Breadcrumbs = () => {
  const [breadcrumbMap, setBreadcrumbMap] = useState<TBreadcrumbMap>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        const categories: TCategoryProps[] = response?.body.results.map(
          (category) => ({
            id: category.id,
            key: category.key,
            name: category.name['en-US'],
            slug: category.slug?.['en-US'],
            ...(category.parent && { parent: category.parent.id }),
          })
        );

        const categoryMap = new Map<string, TCategoryProps>();
        categories.forEach((category) => {
          categoryMap.set(category.id, category);
        });

        const getFullPath = (category: TCategoryProps): string => {
          let path = `/catalog/${category.slug}`;
          let current = category;

          while (current.parent) {
            const parentCategory = categoryMap.get(current.parent);
            if (!parentCategory) break;
            path = `/catalog/${parentCategory.slug}${path.replace('/catalog', '')}`;
            current = parentCategory;
          }
          return path;
        };

        const breadcrumbMap: TBreadcrumbMap = { '/catalog': 'Catalog' };
        categories.forEach((category) => {
          if (category.slug) {
            breadcrumbMap[getFullPath(category)] = category.name;
          }
        });

        setBreadcrumbMap(breadcrumbMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((elem) => elem);
    const breadcrumbs: TBreadcrumbItem[] = [];

    pathnames.forEach((_, index) => {
      const route: string = `/${pathnames.slice(0, index + 1).join('/')}`;
      breadcrumbs.push({
        key: route,
        title: breadcrumbMap[route],
      });
    });
    return breadcrumbs;
  };

  return (
    <Breadcrumb className={classes.breadcrumbs} items={getBreadcrumbs()} />
  );
};
