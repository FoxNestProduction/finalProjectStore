import orderReducer, { putNewOrder, setPendingOrderInfo } from '../slices/orderSlice';
import { instance } from '../../API/instance';

const initialState = {
  order: {},
  pendingOrderInfo: {},
  loading: false,
  error: null,
};

describe('orderSlice reducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should save order info with "setPendingOrderInfo" action', () => {
    const orderInfo = {
      products: [{ name: 'Cheeseburger', price: '12.99' }],
      name: 'John',
      email: 'test@gmail.com',
      paymentInfo: 'Card',
    };
    const state = orderReducer(undefined, setPendingOrderInfo(orderInfo));
    expect(state.pendingOrderInfo).toEqual(orderInfo);
  });
});

describe('orderSlice extraReducers', () => {
  test('should change status with "putNewOrder.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = orderReducer(prevState, putNewOrder.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should post order with "putNewOrder.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const newOrderData = {
      data: {
        order: {
          products: [{ name: 'Cheeseburger', price: '12.99' }],
          name: 'John',
          email: 'test@gmail.com',
          paymentInfo: 'Card',
        },
      },
    };
    const state = orderReducer(prevState, putNewOrder.fulfilled(newOrderData));
    expect(state.order).toEqual(newOrderData.data.order);
    expect(state.loading).toBe(false);
  });

  test('should change status with "putNewOrder.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const errorMessage = 'Something went wrong. We couldn\'t process your order.';
    const action = {
      type: putNewOrder.rejected.type,
      payload: errorMessage,
    };
    const state = orderReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

jest.mock('../../API/instance');

describe('orderThunk', () => {
  test('should putNewOrder with resolved response', async () => {
    const mockOrder = {
      products: [{ name: 'Cheeseburger', price: '12.99' }],
      name: 'John',
      email: 'test@gmail.com',
      paymentInfo: 'Card',
    };

    instance.post.mockResolvedValue(mockOrder);

    const dispatch = jest.fn();
    const thunk = putNewOrder(mockOrder);

    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('order/putNewOrder/pending');
    expect(end[0].type).toBe('order/putNewOrder/fulfilled');
    expect(end[0].payload).toEqual(mockOrder);

    expect(instance.post).toHaveBeenCalledWith('/orders', mockOrder);
  });

  test('should putNewOrder with rejected response', async () => {
    const mockOrder = {
      products: [{ name: 'Cheeseburger', price: '12.99' }],
      name: 'John',
      email: 'test@gmail.com',
      paymentInfo: 'Card',
    };
    const customErrorMessage = "Oops! We couldn't process your order. Please check your details and try again. If the issue persists, contact support.";
    instance.post.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = putNewOrder(mockOrder);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('order/putNewOrder/pending');
    expect(end[0].type).toBe('order/putNewOrder/rejected');
    expect(end[0].payload).toBe(customErrorMessage);
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.post).toHaveBeenCalledWith('/orders', mockOrder);
  });
});
