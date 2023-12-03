import {TypeLoginRequest, TypeRegisterRequest} from '../interfaces/auth';
import {request} from '../request';

export const loginRequest = (params: TypeLoginRequest) =>
  request.post('/login', params);

export const registerRequest = (params: TypeRegisterRequest) =>
  request.post('/signup', params);
