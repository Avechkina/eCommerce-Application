import createCart from './createCart';
import getCart from './getCart';

const getOrCreateCart = async () => {
  const response = await getCart();
  let cart = response.body.results[0];
  if (!cart) {
    const response = await createCart();
    cart = response.body;
  }
  return cart;
};

export default getOrCreateCart;
