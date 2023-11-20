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
    const result = errorReducer(initialState, setAuthorizationError(error));
    expect(result.authorization).toBe(error);
  });

  test('should save registration error into state with "setRegistrationError" action', () => {
    const error = 'RegistrationError error!';
    const result = errorReducer(initialState, setRegistrationError(error));
    expect(result.registration).toBe(error);
  });
});
