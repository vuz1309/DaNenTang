import axios from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../../storage/asyncStorage';
/**
 * Khởi tạo cách truyền và xử lí Rest-API
 * @Author NTVu - MF1742 - 23/08/2023
 * @param {import('axios').CreateAxiosDefaults} config
 * @param {{auth: boolean, silent: boolean}} param2
 * @returns {import('axios').AxiosInstance}
 */
export const createApiInstance = (config, {auth = true, silent} = {}) => {
  const api = axios.create(config);

  api.interceptors.request.use(
    config => {
      if (auth && config?.headers) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    error => {
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
      if (response.data.token) {
        setAccessToken(response.data.token);
      }
      return response;
    },
    /**
     * Xử lí các trường hợp lỗi
     * @author NTVu - 06/09/2023
     * @param {import('axios').AxiosError} error
     * @returns {{message: string, data: object}} data
     */
    error => {
      if (!silent) {
        console.log(error);
      }
      if (auth) removeAccessToken();
      return Promise.reject(error);
    },
  );

  return api;
};
/**
 * @Author NTVu - MF1742 - 23/08/2023
 * @description Tạo một apiInstance với content là json
 */
export const api = createApiInstance(
  {
    baseURL: `${'https://it4788.catan.io.vn'}/api/v1`,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  },
  {auth: true, silent: false},
);
