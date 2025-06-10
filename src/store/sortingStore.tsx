import { create } from 'zustand';

interface SortingState {
  sortValue: string;
  sortLabel: string;
  setSortingValue: (newValue: string, label: string) => void;
  resetSortingValue: () => void;
}
const useSortingStore = create<SortingState>()((set) => ({
  sortValue: '',
  sortLabel: '',
  setSortingValue: (newValue: string, label: string) =>
    set({ sortValue: newValue, sortLabel: label }),
  resetSortingValue: () => set({ sortValue: '', sortLabel: '' }),
}));

export default useSortingStore;
