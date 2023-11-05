import {AxiosRequestConfig} from 'axios';

export interface TypeLoginRequest extends AxiosRequestConfig {
  email: string;
  password: string;
  // keepLogin?: boolean;
}

export interface TypeRegisterRequest extends AxiosRequestConfig {
  email: string;
  password: string;
  uuid: string;
}
