import axios from 'axios';
import {BE_URL} from './config';
import {getAccessToken} from '../storage/asyncStorage';

const request = axios.create({
  baseURL: BE_URL,
  timeout: 8000,
  headers: {Accept: '*/*', 'Content-Type': 'application/json'},
});
export const authAndFileRequest = async () =>
  axios.create({
    baseURL: BE_URL,
    timeout: 8000,
    headers: {
      Accept: '*/*',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
export const authRequestJSON = async () =>
  axios.create({
    baseURL: BE_URL,
    timeout: 8000,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });

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

export default request;
