import getProducts from '@utils/getProducts';
import { useEffect, useState } from 'react';
import {
  ProductCard,
  TProductCardProps,
} from '@components/ProductCard/ProductCard';
import useCategoryStore from '@store/categoryStore';
import useSearchStore from '@store/searchStore';
import useSortingStore from '@store/sortingStore';
export function ProductsList() {
  const [products, setProducts] = useState<TProductCardProps[]>([]);
  const id = useCategoryStore((state) => state.id);
  const searchValue = useSearchStore((state) => state.searchValue);
  const sortValue = useSortingStore((state) => state.sortValue);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(id, searchValue, sortValue);
        const formattedData: TProductCardProps[] =
          response?.body.results.map((product) => ({
            id: product.id,
            name: product.name['en-US'] || 'No Name',
            image: product.masterVariant.images?.[0]?.url || '',
            ...(product.description && {
              description: product.description['en-US'],
            }),
            price:
              (product.masterVariant.prices?.[0]?.value.centAmount ?? 0) /
              10 **
                (product.masterVariant.prices?.[0].value.fractionDigits ?? 2),
            ...(product.masterVariant.prices?.[0].discounted && {
              discont:
                product.masterVariant.prices?.[0].discounted.value.centAmount /
                100,
            }),
            slug: product.slug,
          })) ?? [];

        setProducts(formattedData);
        console.log(id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, searchValue, sortValue]);
  return (
    <>
      {products.length
        ? products.map((product) => (
            <ProductCard
              id={product.id}
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              discont={product.discont}
              slug={product.slug}
              description={product.description}
            />
          ))
        : 'No products found'}
    </>
  );
}
