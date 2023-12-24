import {
  TypeLoginRequest,
  TypeRegisterRequest,
  TypeSetDevToken,
} from '../interfaces/auth';
import {request, requestJSONWithAuth} from '../request';

export const loginRequest = (params: TypeLoginRequest) =>
  request.post('/login', params);

export const registerRequest = (params: TypeRegisterRequest) =>
  request.post('/signup', params);
export const changePassword = (param: {
  password: string;
  new_password: string;
}) => {
  return requestJSONWithAuth('/change_password', param);
};
export const setDevToken = (params: TypeSetDevToken) => {
  return requestJSONWithAuth('/set_devtoken', params);
};

export const checkEmailRequest = (params: {email: string}) => {
  return requestJSONWithAuth('/check_email', params);
};
  export const resetPassword = (params: {email:string,code:string,password:string}) => {
    return requestJSONWithAuth('/reset_password ', params);
};
