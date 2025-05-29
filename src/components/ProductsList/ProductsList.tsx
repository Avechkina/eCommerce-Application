import getProducts from '@utils/getProducts';
import classes from './ProductsList.module.css';
import { useEffect, useState } from 'react';
import {
  ProductCard,
  TProductCardProps,
} from '@components/ProductCard/ProductCard';
export function ProductsList() {
  const [products, setProducts] = useState<TProductCardProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
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
        console.log(response.body.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className={classes.products_list}>
      {products.length &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            discont={product.discont}
          />
        ))}
    </div>
  );
}
