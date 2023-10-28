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

const cartIconCounterFunction = (cartProducts) => {
  if (cartProducts.length) {
    const cartCounter = cartProducts
      .map(({ cartQuantity }) => cartQuantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return cartCounter;
  }
  return 0;
};

const totalSumFromCart = (cartProducts) => {
  if (cartProducts.length) {
    const totalSum = cartProducts
      .map(({ product: { currentPrice }, cartQuantity }) => currentPrice * cartQuantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return (totalSum < 100
      ? +totalSum.toString().slice(0, 5)
      : totalSum < 1000
        ? +totalSum.toString().slice(0, 6)
        : +totalSum.toString().slice(0, 7));
  }
  return 0;
};

export {
  createCart,
  updateCart,
  updateCartAfterCloseWindow,
  cartIconCounterFunction,
  totalSumFromCart,
};
