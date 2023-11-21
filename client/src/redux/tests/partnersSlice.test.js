import partnersReducer, { fetchTopPartners, fetchAllPartnersNames } from '../slices/partnersSlice';
import { instance } from '../../API/instance';

const initialState = {
  topPartners: [],
  allPartnersNames: [],
  loading: false,
  error: null,
};

describe('partnersSlice extraReducers', () => {
  test('should return initial state when passed an empty action', () => {
    expect(partnersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should change status with "fetchTopPartners.pending" action', () => {
    const prevState = {
      ...initialState,
      loading: false,
      error: 'error',
    };
    const state = partnersReducer(prevState, fetchTopPartners.pending());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should fetch top partners with "fetchTopPartners.fulfilled" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const partners = [
      { customId: '17001', name: 'Sushi Delight', isTrending: true },
      { customId: '17002', name: 'Burger Heaven', isTrending: false },
    ];

    const state = partnersReducer(prevState, fetchTopPartners.fulfilled(partners));
    expect(state.topPartners).toEqual(partners);
    expect(state.loading).toBe(false);
  });

  test('should change status with "fetchTopPartners.rejected" action', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };
    const errorMessage = 'Something went wrong.';
    const action = {
      type: fetchTopPartners.rejected.type,
      payload: errorMessage,
    };
    const state = partnersReducer(prevState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('should fetch all partners names with "fetchAllPartnersNames.fulfilled" action', () => {
    const partnersNames = ['Sushi Delight', 'Burger Heaven', 'Welcome Pizzeria'];
    const state = partnersReducer(initialState, fetchAllPartnersNames.fulfilled(partnersNames));
    expect(state.allPartnersNames).toEqual(partnersNames);
  });
});

jest.mock('../../API/instance');

describe('partnersThunk fetchTopPartners', () => {
  test('should fetchTopPartners with resolved response', async () => {
    const mockTopPartners = [
      { customId: '17001', name: 'Sushi Delight', isTrending: true },
      { customId: '17002', name: 'Burger Heaven', isTrending: false },
    ];
    const count = 2;

    instance.get.mockResolvedValue({ data: { partners: mockTopPartners } });
    const dispatch = jest.fn();

    const thunk = fetchTopPartners(count);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('partners/fetchTopPartners/pending');
    expect(end[0].type).toBe('partners/fetchTopPartners/fulfilled');
    expect(end[0].payload).toEqual(mockTopPartners);

    expect(instance.get).toHaveBeenCalledWith(`/partners/filter?perPage=${count}&sort=-rating`);
  });

  test('should fetchTopPartners with rejected response', async () => {
    const count = 2;
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchTopPartners(count);
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('partners/fetchTopPartners/pending');
    expect(end[0].type).toBe('partners/fetchTopPartners/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith(`/partners/filter?perPage=${count}&sort=-rating`);
  });
});

describe('partnersThunk fetchAllPartnersNames', () => {
  test('should fetchAllPartnersNames with resolved response', async () => {
    const partnersNames = ['Sushi Delight', 'Burger Heaven', 'Welcome Pizzeria'];

    instance.get.mockResolvedValue({ data: partnersNames });
    const dispatch = jest.fn();

    const thunk = fetchAllPartnersNames();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('partners/fetchAllPartnersNames/pending');
    expect(end[0].type).toBe('partners/fetchAllPartnersNames/fulfilled');
    expect(end[0].payload).toEqual(partnersNames);
    expect(end[0].payload.length).toBe(3);

    expect(instance.get).toHaveBeenCalledWith('/partners/names');
  });

  test('should fetchAllPartnersNames with rejected response', async () => {
    instance.get.mockRejectedValue({ response: { data: { message: 'Something went wrong' } } });

    const dispatch = jest.fn();
    const thunk = fetchAllPartnersNames();
    await thunk(dispatch);
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start, end] = calls;

    expect(start[0].type).toBe('partners/fetchAllPartnersNames/pending');
    expect(end[0].type).toBe('partners/fetchAllPartnersNames/rejected');
    expect(end[0].payload.message).toBe('Something went wrong');
    expect(end[0].meta.rejectedWithValue).toBe(true);

    expect(instance.get).toHaveBeenCalledWith('/partners/names');
  });
});
