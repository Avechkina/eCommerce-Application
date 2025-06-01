import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface categoryState {
  id: string;
  updateId: (newId: string) => void;
}
const useCategoryStore = create<categoryState>()(
  persist(
    (set) => ({
      id: '',
      updateId: (newId: string) => set({ id: newId }),
    }),
    { name: 'category-storage' }
  )
);

export default useCategoryStore;
