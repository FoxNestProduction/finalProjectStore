import { setDataToSessionStorage } from './sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../constants/constants';

const saveUserInfoToSessionStorage = (user) => {
  const data = {
    name: user.firstName,
    email: user.email,
  };

  if (user.telephone) {
    data.tel = user.telephone;
  }
  setDataToSessionStorage(CHECKOUT_SS_KEY, data);
};

export default saveUserInfoToSessionStorage;
