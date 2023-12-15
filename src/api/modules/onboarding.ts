import {TypeCheckVerifyCode, TypeGetVerifyCode} from '../interfaces/auth';
import {request} from '../request';

export const checkVerifyCodeRequest = (params: TypeCheckVerifyCode) =>
  request.post('/check_verify_code', params);
export const getVerifyCodeRequest = (params: TypeGetVerifyCode) =>
  request.post('/get_verify_code', params);
