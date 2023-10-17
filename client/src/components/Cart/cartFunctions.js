import { instance } from '../../API/instance';

const createCart = async (cartProducts) => {
  const cartProductsFromServer = cartProducts.map((cartProduct) => {
    const newCartProductObj = {
      // eslint-disable-next-line no-underscore-dangle
      product: cartProduct.id,
      cartQuantity: cartProduct.cartQuantity,
    };
    return newCartProductObj;
  });
  const cart = {
    products: [
      ...cartProductsFromServer,
    ],
  };
  try {
    const { data } = await instance.post('/cart', cart);
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

const updateCart = async (cartProducts) => {
  const cartProductsFromServer = cartProducts.map((cartProduct) => {
    const newCartProductObj = {
      // eslint-disable-next-line no-underscore-dangle
      product: cartProduct.product._id,
      cartQuantity: cartProduct.cartQuantity,
    };
    return newCartProductObj;
  });
  console.log(cartProductsFromServer);
  const updatedCart = {
    products: [
      ...cartProductsFromServer,
    ],
  };
  try {
    const { data } = await instance.put('/cart', updatedCart);
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

const updateCartAfterCloseWindow = (cartProducts) => {
  const handleUnload = () => {
    updateCart(cartProducts);
  };
  window.addEventListener('beforeunload', handleUnload);
  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
};

export { createCart, updateCart, updateCartAfterCloseWindow };
