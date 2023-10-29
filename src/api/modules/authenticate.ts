import { TypeLoginRequest } from "../interfaces/auth";
import request from '../request'

export const loginRequest = (params: TypeLoginRequest) =>
  request.post(`/login`, params);

