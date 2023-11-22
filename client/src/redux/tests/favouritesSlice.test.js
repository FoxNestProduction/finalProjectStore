import favouritesReducer, {
  addFavourite,
  setIsFavourite,
  removeFavourite,
  setIsLoading,
  resetCardStates,
  fetchFavourites,
} from '../slices/favouriteSlice';
import { instance } from '../../API/instance';

const initialState = {
  favourites: [],
  cardStates: {},
  loading: false,
  error: null,
  addDeleteError: null,
};

describe('favouritesSlice reducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(favouritesReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add favourite product with "addFavourite" action', () => {
    const favProduct = [{ name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' }];
    const state = favouritesReducer(undefined, addFavourite(favProduct));
    expect(state.favourites).toContainEqual(favProduct[0]);
  });

  test('should set isFavourite with "setIsFavourite" action', () => {
    const id = '123';
    const state = favouritesReducer(undefined, setIsFavourite(id));
    expect(state.cardStates[id]).toBe(true);
    expect(state.loading).toBe(true);
  });

  test('should set loading to false with "setIsLoading" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const state = favouritesReducer(prevState, setIsLoading());
    expect(state.loading).toBe(false);
  });

  test('should remove favourite product with "removeFavourite" action', () => {
    const prevState = {
      ...initialState,
      favourites: [
        { name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' },
        { name: 'Vegan Burger', currentPrice: '12.49', _id: '456' },
      ],
      cardStates: {
        '123': true,
        '456': true,
      },
      loading: false,
    };
    const idToRemove = '123';
    const state = favouritesReducer(prevState, removeFavourite(idToRemove));
    expect(state.favourites.some((item) => item._id === idToRemove)).toBe(false);
    expect(state.cardStates[idToRemove]).toBeUndefined();
    expect(state.loading).toBe(true);
  });

  test('should reset cardStates and favourites with "resetCardStates" action', () => {
    const prevState = {
      ...initialState,
      favourites: [
        { name: 'Avocado Veggie Burger', currentPrice: '11.49', _id: '123' },
        { name: 'Vegan Burger', currentPrice: '12.49', _id: '456' },
      ],
      cardStates: {
        '123': true,
        '456': true,
      },
    };
    const state = favouritesReducer(prevState, resetCardStates());
    expect(state.cardStates).toEqual({});
    expect(state.favourites).toEqual([]);
  });
});

describe('favouritesSlice extraReducers', () => {
  test('should change status with "fetchFavourites.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = favouritesReducer(prevState, fetchFavourites.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch favourites with "fetchFavourites.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const favourites = [
      { _id: '123', name: 'Cheeseburger', price: '10.99' },
      { _id: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    const state = favouritesReducer(prevState, fetchFavourites.fulfilled(favourites));
    expect(state.loading).toBe(false);
    expect(state.favourites).toEqual(favourites);
    favourites.forEach(({ _id }) => {
      expect(state.cardStates[_id]).toBe(true);
    });
  });

  test('should change status with "fetchFavourites.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
      error: null,
    };
    const errorMessage = 'Something went wrong.';
    const action = {
      type: fetchFavourites.rejected.type,
      payload: errorMessage,
    };
    const state = favouritesReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});

jest.mock('../../API/instance');

describe('favouritesThunk fetchFavourites', () => {
  test('should fetchFavourites with resolved response', async () => {
    const mockFavourites = [
      { _id: '123', name: 'Cheeseburger', price: '10.99' },
      { _id: '456', name: 'Cesar Salad', price: '12.99' },
    ];

    instance.get.mockResolvedValue({ data: { products: mockFavourites } });
    const dispatch = jest.fn();

    const thunk = fetchFavourites();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('favourites/fetchFavourites/pending');
    expect(end[0].type).toBe('favourites/fetchFavourites/fulfilled');
    expect(end[0].payload).toEqual(mockFavourites);

    expect(instance.get).toHaveBeenCalledWith('/wishlist');
  });

  test('should fetchFavourites with rejected response', async () => {
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchFavourites();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('favourites/fetchFavourites/pending');
    expect(end[0].type).toBe('favourites/fetchFavourites/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith('/wishlist');
  });
});
