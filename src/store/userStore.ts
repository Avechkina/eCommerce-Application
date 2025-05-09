import { create } from 'zustand';

interface UserState {
  id: string;
  isAuth: boolean;
  updateId: (newId: string, isAuth: boolean) => void;
}
const useUserStore = create<UserState>()((set) => ({
  id: '',
  isAuth: false,
  updateId: (newId: string, isAuth: boolean) => set({ id: newId, isAuth }),
}));

export default useUserStore;
