import { create } from 'zustand';
import { Address as CommerceToolsAddress } from '@commercetools/platform-sdk';

interface AddressState {
  address: CommerceToolsAddress;
  isOpen: boolean;
  setAddress: (newAddress: CommerceToolsAddress) => void;
  closeModal: () => void;
  openModal: () => void;
}

const initialState: CommerceToolsAddress = {
  id: '',
  country: '',
  city: '',
  postalCode: '',
  streetName: '',
};

const useModalStore = create<AddressState>()((set) => ({
  address: initialState,
  isOpen: false,
  setAddress: (newAddress) => set({ address: newAddress, isOpen: true }),
  closeModal: () => set({ address: initialState, isOpen: false }),
  openModal: () => set({ address: initialState, isOpen: true }),
}));

export default useModalStore;
