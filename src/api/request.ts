import axios from 'axios';
import {BE_URL} from './config'
const request = axios.create({
    baseURL: BE_URL,
    timeout: 8000,
    headers: { Accept: '*/*','Content-Type': 'application/json'},
  });

export default request;
