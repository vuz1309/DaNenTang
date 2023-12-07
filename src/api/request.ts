import axios from 'axios';
import {BE_URL, createApiInstance} from './config';

export const request = createApiInstance(
  {
    baseURL: BE_URL,
    timeout: 8000,
    headers: {Accept: '*/*', 'Content-Type': 'application/json'},
  },
  {auth: false, silent: false},
);
export const authAndFileRequest = createApiInstance({
  baseURL: BE_URL,
  timeout: 8000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data',
  },
});

const authRequestJSON = createApiInstance(
  {
    baseURL: BE_URL,
    timeout: 8000,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  },
  {auth: true, silent: false},
);

export const serverRequest = axios.create({
  baseURL: 'https://fcm.googleapis.com',
  timeout: 8000,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAzHUav3E:APA91bF_SRiz2V9gJeiBTc5aMwCSxZuvRIA-VWROQ3j5Vf8Y1N7Kn0RajdgVXlDeJdiYb4A2tzqrgOeR-grbXo7ls60ospqWd7SobJVAzZCNaIP_rtFR0BfgLK4uSif2OmNpTpQr85Rq',
  },
});

import {store} from '../state-management/redux/store';
export const requestJSONWithAuth = (url: string, params: object) => {
  console.log('token request', store.getState().userInfo.token);
  return authRequestJSON.post(url, params);
};
