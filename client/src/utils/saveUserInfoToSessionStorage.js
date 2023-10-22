import { setDataToSessionStorage } from './sessionStorageHelpers';
import { CHECKOUT_LS_KEY } from '../constants';

const saveUserInfoToSessionStorage = (user) => {
  const data = {
    name: user.firstName,
    email: user.email,
  };

  if (user.telephone) {
    data.tel = user.telephone;
  }
  setDataToSessionStorage(CHECKOUT_LS_KEY, data);
};

export default saveUserInfoToSessionStorage;
