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

const sendCarttoDB = async (cartProducts) => {
  try {
    const { data } = await instance.get('http://localhost:4000/api/cart');
    console.log(data);
  } catch (err) {
    console.warn(err);
  }
};

export default createCart;
