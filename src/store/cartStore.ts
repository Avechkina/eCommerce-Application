import { CartItem } from 'types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[] | undefined;
  setItems: (items: CartItem[]) => void;
  resetCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: undefined,
      setItems: (items) => set({ items }),
      resetCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;
