import {AxiosRequestConfig} from 'axios';

export interface TypePushNotificationRequest extends AxiosRequestConfig {
  data: {
    title: string,
    body: string,
  };
  to: string;
}