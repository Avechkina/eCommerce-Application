import { Customer } from '@commercetools/platform-sdk';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: Customer | undefined;
  isAuth: boolean;
  updateUser: (user: Customer) => void;
  resetUser: () => void;
}
const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      isAuth: false,
      updateUser: (user) => set({ user, isAuth: true }),
      resetUser: () => set({ user: undefined, isAuth: false }),
    }),
    { name: 'user-storage' }
  )
);

export default useUserStore;
