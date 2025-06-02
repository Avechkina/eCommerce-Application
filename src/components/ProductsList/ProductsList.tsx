import getProducts from '@utils/getProducts';
import { useEffect, useState } from 'react';
import {
  ProductCard,
  TProductCardProps,
} from '@components/ProductCard/ProductCard';
import useCategoryStore from '@store/categoryStore';
export function ProductsList() {
  const [products, setProducts] = useState<TProductCardProps[]>([]);
  const id = useCategoryStore((state) => state.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(id);
        const formattedData: TProductCardProps[] =
          response?.body.results.map((product) => ({
            id: product.id,
            name: product.name['en-US'] || 'No Name',
            image: product.masterVariant.images?.[0]?.url || '',
            price:
              (product.masterVariant.prices?.[0]?.value.centAmount ?? 0) /
              10 **
                (product.masterVariant.prices?.[0].value.fractionDigits ?? 2),
          })) ?? [];

        setProducts(formattedData);
        console.log(id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      {products.length
        ? products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              discont={product.discont}
            />
          ))
        : 'No products found'}
    </>
  );
}
