export type CartItem = {
  key: string;
  product: Product;
  quantity: number;
  price: string;
  subtotal: string;
};

export type Product = {
  id: string;
  name: string;
  imgUrl: string | undefined;
};

export type CartDetails = {
  id: string;
  version: number;
};
