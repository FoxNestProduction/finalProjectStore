import authorizationReducer, { setAuthorization, setToken } from '../slices/authorizationSlice';

const initialState = {
  isUserAuthorized: false,
  token: null,
};

describe('authorizationSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(authorizationReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should change isUserAuthorized state with "setAuthorization" action', () => {
    const state = authorizationReducer(initialState, setAuthorization(true));
    expect(state.isUserAuthorized).toBe(true);
  });

  test('should save token to state with "setToken" action', () => {
    const token = 'Bearer 1234567890';
    const state = authorizationReducer(initialState, setToken(token));
    expect(state.token).toBe(token);
  });
});
