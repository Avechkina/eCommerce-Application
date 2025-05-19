import { Address } from 'types/registration';
import { create } from 'zustand';

interface AddressState {
  address: Address;
  updateAddress: (newAddress: Address) => void;
}

const initialState: Address = {
  country: '',
  city: '',
  postalCode: '',
  streetName: '',
};

const useAddressStore = create<AddressState>()((set) => ({
  address: initialState,
  updateAddress: (newAddress) => set({ address: newAddress }),
}));

export default useAddressStore;
