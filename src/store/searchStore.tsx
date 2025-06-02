import { create } from 'zustand';

interface SearchState {
  searchValue: string;
  setValue: (newValue: string) => void;
}
const useSearchStore = create<SearchState>()((set) => ({
  searchValue: '',
  setValue: (newValue: string) => set({ searchValue: newValue }),
}));

export default useSearchStore;
