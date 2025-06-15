import { CartDetails, CartItem } from 'types/cart';
import { create } from 'zustand';

interface CartState {
  items: CartItem[] | undefined;
  cartDetails: CartDetails;
  originalPrice: string;
  subtotal: string;
  setItems: (items: CartItem[], subtotal: string) => void;
  setDetails: (details: CartDetails) => void;
  setOriginalPrice: (originalPrice: string) => void;
  resetCart: () => void;
}

const useCartStore = create<CartState>()((set) => ({
  items: undefined,
  cartDetails: {
    id: '',
    version: 0,
  },
  originalPrice: '',
  subtotal: '',
  setItems: (items, subtotal) => set({ items, subtotal }),
  setDetails: (details) => set({ cartDetails: details }),
  setOriginalPrice: (originalPrice) => set({ originalPrice }),
  resetCart: () =>
    set({
      items: undefined,
      subtotal: '',
      originalPrice: '',
    }),
}));

export default useCartStore;
