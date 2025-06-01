import getCategories from '@utils/getCategories';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];
type CustomMenuItem = MenuItem & {
  slug?: string;
  children?: CustomMenuItem[];
};

//Fetch categories using Commercetools SDK

type TCategoryProps = {
  id: string;
  key?: string;
  name: string;
  slug?: string;
  parent?: string;
};

const CatalogSidebar = () => {
  const [items, setItems] = useState<CustomMenuItem[]>([]);
  const navigate = useNavigate();
  const handleMenuItemClick = (
    e: { key: string },
    items: CustomMenuItem[]
  ): void => {
    let categoryItem = items.find((item) => item.key === e.key);
    let subCategoryItem: CustomMenuItem | undefined = undefined;
    if (!categoryItem) {
      for (const item of items) {
        subCategoryItem = item.children?.find((child) => child.key === e.key);
        if (subCategoryItem) {
          categoryItem = item;
          break;
        }
      }
    }

    const targetSlug = subCategoryItem
      ? `${categoryItem?.slug}/${subCategoryItem.slug}`
      : categoryItem?.slug;
    console.log(targetSlug);
    navigate(`/catalog/${targetSlug}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        const formattedData: TCategoryProps[] = response?.body.results.map(
          (category) => ({
            id: category.id,
            key: category.key,
            name: category.name['en-US'],
            slug: category.slug?.['en-US'],
            ...(category.parent && { parent: category.parent.id }),
          })
        );

        const mainCategories = formattedData.filter(
          (category) => !category.parent
        );
        const subCategories = formattedData.filter(
          (category) => category.parent
        );

        setItems(
          mainCategories.map((category) => {
            const filteredChildren = subCategories
              .filter(({ parent }) => parent === category.id)
              .map((subCategorie) => ({
                key: subCategorie.id,
                label: subCategorie.name,
                slug: subCategorie.slug,
              }));

            return {
              key: category.id,
              label: category.name,
              slug: category.slug,
              ...(filteredChildren.length > 0 && {
                children: filteredChildren,
              }),
            };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Sider theme="light">
      <Menu
        onClick={(e) => handleMenuItemClick(e, items)}
        items={items}
        mode="inline"
        style={{ textAlign: 'left' }}
      />
    </Sider>
  );
};

export default CatalogSidebar;
