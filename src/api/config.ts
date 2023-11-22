export const BE_URL = 'https://it4788.catan.io.vn';
import axios from 'axios';

import {getAccessToken} from '../storage/asyncStorage';
import {logger} from '../utils/helper';

/**
 * Khởi tạo cách truyền và xử lí Rest-API
 * @Author NTVu - MF1742 - 23/08/2023
 * @param {import('axios').CreateAxiosDefaults} config
 * @param {{auth: boolean, silent: boolean}} param2
 * @returns {import('axios').AxiosInstance}
 */
export const createApiInstance = (
  config: import('axios').CreateAxiosDefaults,
  {auth = true, silent}: {auth?: boolean; silent?: boolean} = {},
) => {
  const api = axios.create(config);

  api.interceptors.request.use(
    config => {
      if (auth && config?.headers) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    error => {
      console.log('error frontend');
      Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    /**
     * Nếu response nhận về là json về convert về dạng camelCase
     * @author NTVu - 14/09/2023
     * @param {import('axios').AxiosResponse} response
     * @returns {import('axios').AxiosResponse}
     */
    response => {
      return response;
    },
    /**
     * Xử lí các trường hợp lỗi
     * @author NTVu - 06/09/2023
     * @param {import('axios').AxiosError} error
     * @returns {{message: string, data: object}} data
     */
    error => {
      console.log('error backend');
      if (!silent) {
        console.log(error);
      }

      return Promise.reject(error);
    },
  );

  return api;
};

/**
 * @Author NTVu
 * @description auth api
 */
export const authApi = createApiInstance(
  {
    baseURL: BE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  },

  {auth: true, silent: false},
);
