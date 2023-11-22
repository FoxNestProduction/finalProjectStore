import errorReducer, { setAuthorizationError, setRegistrationError } from '../slices/errorSlice';

const initialState = {
  authorization: '',
  registration: '',
};

describe('errorSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(errorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should save authorization error into state with "setAuthorizationError" action', () => {
    const error = 'Authorization error!';
    const state = errorReducer(initialState, setAuthorizationError(error));
    expect(state.authorization).toBe(error);
  });

  test('should save registration error into state with "setRegistrationError" action', () => {
    const error = 'Registration error!';
    const state = errorReducer(initialState, setRegistrationError(error));
    expect(state.registration).toBe(error);
  });
});
