import { ProductsList } from '@components/ProductsList/ProductsList';
import useCategoryStore from '@store/categoryStore';

const CatalogHome = () => {
  const categoryType = useCategoryStore((state) => state.categoryType);
  return <>{categoryType === 'all' && <ProductsList />}</>;
};

export default CatalogHome;
