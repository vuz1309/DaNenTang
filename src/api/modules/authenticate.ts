import {TypeLoginRequest, TypeRegisterRequest} from '../interfaces/auth';
import {request, requestJSONWithAuth} from '../request';

export const loginRequest = (params: TypeLoginRequest) =>
  request.post('/login', params);

export const registerRequest = (params: TypeRegisterRequest) =>
  request.post('/signup', params);
export const changePassword= (param: {password:string, new_password:string}) => {
    return requestJSONWithAuth('/change_password', param)
}