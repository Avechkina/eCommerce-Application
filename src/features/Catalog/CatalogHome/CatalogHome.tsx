import {
  ProductCard,
  TProductCardProps,
} from '@components/ProductCard/ProductCard';
import getProducts from '@utils/getProducts';
import { useEffect, useState } from 'react';

const CatalogHome = () => {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
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
    </>
  );
};

export default CatalogHome;
