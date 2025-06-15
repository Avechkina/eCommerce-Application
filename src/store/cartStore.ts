import { CartItem } from 'types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  items: CartItem[] | undefined;
  subtotal: string;
  setItems: (items: CartItem[], subtotal: string) => void;
  resetCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: undefined,
      subtotal: '',
      setItems: (items, subtotal) => set({ items, subtotal }),
      resetCart: () => set({ items: [], subtotal: '' }),
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;
