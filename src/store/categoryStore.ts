import { create } from 'zustand';

interface categoryState {
  categoryType: 'all' | 'category' | 'subcategory';
  id: string;
  updateId: (newId: string) => void;
  updateCategoryType: (newType: 'all' | 'category' | 'subcategory') => void;
  resetCategory: () => void;
  setCategory: (id: string, type: 'all' | 'category' | 'subcategory') => void;
}
const useCategoryStore = create<categoryState>()((set) => ({
  categoryType: 'all',
  id: '',
  updateId: (newId: string) => set({ id: newId }),
  updateCategoryType: (newType) => set({ categoryType: newType }),
  resetCategory: () => set({ categoryType: 'all', id: '' }),
  setCategory: (newId, type) => set({ id: newId, categoryType: type }),
}));

export default useCategoryStore;
