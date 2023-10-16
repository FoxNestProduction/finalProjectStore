import { setDataToSessionStorage } from './sessionStorageHelpers';
import { CHECKOUT_LS_KEY } from '../constants';

const saveUserInfoToSessionStorage = (user) => {
  setDataToSessionStorage(CHECKOUT_LS_KEY, {
    name: user.firstName,
    email: user.email,
    tel: user.telephone || '',
  });
};

export default saveUserInfoToSessionStorage;
