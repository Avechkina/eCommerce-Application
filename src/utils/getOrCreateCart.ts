import createCart from './createCart';
import getCart from './getCart';

const getOrCreateCart = async (ID: string) => {
  const response = await getCart(ID);
  let cart = response.body;
  if (!cart.id) {
    const response = await createCart();
    cart = response.body;
  }
  return cart;
};

export default getOrCreateCart;
