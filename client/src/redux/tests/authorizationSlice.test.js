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
    const result = authorizationReducer(initialState, setAuthorization(true));
    expect(result.isUserAuthorized).toBe(true);
  });

  test('should save token to state with "setToken" action', () => {
    const token = 'Bearer 1234567890';
    const result = authorizationReducer(initialState, setToken(token));
    expect(result.token).toBe(token);
  });
});
