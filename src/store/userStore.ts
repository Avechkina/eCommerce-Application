import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  id: string;
  isAuth: boolean;
  updateId: (newId: string, isAuth: boolean) => void;
}
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: '',
      isAuth: false,
      updateId: (newId: string, isAuth: boolean) => set({ id: newId, isAuth }),
    }),
    { name: 'user-storage' }
  )
);

export default useUserStore;
