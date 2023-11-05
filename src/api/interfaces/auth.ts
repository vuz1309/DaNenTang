import {AxiosRequestConfig} from 'axios';

export interface TypeLoginRequest extends AxiosRequestConfig {
  email: string;
  password: string;
  // keepLogin?: boolean;
}
