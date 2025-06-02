import { ProductsList } from '@components/ProductsList/ProductsList';
import useCategoryStore from '@store/categoryStore';

const CategoryView = () => {
  const categoryType = useCategoryStore((state) => state.categoryType);

  return <>{categoryType === 'category' && <ProductsList />}</>;
};

export default CategoryView;
