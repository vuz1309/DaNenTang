import {AxiosRequestConfig} from 'axios';

export interface TypeLoginRequest extends AxiosRequestConfig {
  email: string;
  password: string;
  // keepLogin?: boolean;
  uuid: string;
}

export interface TypeRegisterRequest extends AxiosRequestConfig {
  email: string;
  password: string;
  uuid: string;
}
export interface TypeCheckVerifyCode extends AxiosRequestConfig {
  email: string;
  code_verify: string;
}
export interface TypeGetVerifyCode extends AxiosRequestConfig {
  email: string;
}
