const changeCartObjectFromServer = (cartProducts) => {
  const cart = {
    products: [],
  };
  if (cartProducts.length) {
    const cartProductsFromServer = cartProducts.map((cartProduct) => {
      const newCartProductObj = {
        // eslint-disable-next-line no-underscore-dangle
        product: cartProduct.product._id,
        cartQuantity: cartProduct.cartQuantity,
      };
      return newCartProductObj;
    });
    cart.products = [...cartProductsFromServer];
  }
  return cart;
};

const cartIconCounterFunction = (cartProducts) => {
  if (cartProducts.length !== 0) {
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

const totalSumFromCartProduct = (currentPrice, cartQuantity = 1) => {
  const totalSum = currentPrice * cartQuantity;
  if (totalSum) {
    return (totalSum < 100
      ? +totalSum.toString().slice(0, 5)
      : totalSum < 1000
        ? +totalSum.toString().slice(0, 6)
        : +totalSum.toString().slice(0, 7));
  }
  return 0;
};

export {
  changeCartObjectFromServer,
  cartIconCounterFunction,
  totalSumFromCart,
  totalSumFromCartProduct,
};
