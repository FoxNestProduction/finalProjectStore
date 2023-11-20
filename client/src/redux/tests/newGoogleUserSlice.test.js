import newGoogleUserReducer, { setNewGoogleUser } from '../slices/newGoogleUserSlice';

const initialState = {
  newGoogleUser: {
    email: '',
    firstName: '',
    lastName: '',
  },
};

describe('newGoogleUserSlice', () => {
  test('should return initial state when passed an empty action', () => {
    expect(newGoogleUserReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('should add new google user with "setNewGoogleUser" action', () => {
    const googleUser = {
      email: 'test@gmail.com',
      firstName: 'John',
      lastName: 'Smith',
    };
    const result = newGoogleUserReducer(initialState, setNewGoogleUser(googleUser));
    expect(result.newGoogleUser).toEqual(googleUser);
  });
});
