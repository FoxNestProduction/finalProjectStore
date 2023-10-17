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
    const { data } = await instance.post('http://localhost:4000/api/cart', cart);
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

const updateCart = async (cartProducts, userId) => {
  const cartProductsFromServer = cartProducts.map((cartProduct) => {
    const newCartProductObj = {
      // eslint-disable-next-line no-underscore-dangle
      product: cartProduct.id,
      cartQuantity: cartProduct.cartQuantity,
    };
    return newCartProductObj;
  });
  const newCart = {
    products: [
      ...cartProductsFromServer,
    ],
  };
  try {
    const { data } = await instance.put(`http://localhost:4000/api/cart/${userId}`, newCart);
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

const updateCartAfterCloseWindow = (isUserAuthorization, cartProducts, userId) => {
  const handleUnload = () => {
    updateCart(cartProducts, userId);
  };
  if (isUserAuthorization) {
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }
  window.addEventListener('beforeunload', handleUnload);
  return () => {
    window.removeEventListener('beforeunload', handleUnload);
  };
};

export { createCart, updateCart };
