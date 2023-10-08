import {api} from './config/api';

export const login = account => {
  return api.post('/login', account);
};

export const register = account => {
  return api.post('signup', account);
};
