import { FilterProducts } from '@components/FilterProducts/FilterProducts';
import classes from './Products.module.css';
import { ProductsList } from '@components/ProductsList/ProductsList';
export function Products() {
  return (
    <div className={classes.products_container}>
      <FilterProducts />
      <ProductsList />
    </div>
  );
}
