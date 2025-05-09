import { create } from 'zustand';

interface UserState {
  id: string;
  updateId: (newId: string) => void;
}
const useUserStore = create<UserState>()((set) => ({
  id: '',
  updateId: (newId: string) => set({ id: newId }),
}));

export default useUserStore;
