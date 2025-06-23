import { ProductsList } from '@components/ProductsList/ProductsList';
import useCategoryStore from '@store/categoryStore';

const SubcategoryView = () => {
  const categoryType = useCategoryStore((state) => state.categoryType);

  return <> {categoryType === 'subcategory' && <ProductsList />}</>;
};

export default SubcategoryView;
