export const BE_URL = 'https://it4788.catan.io.vn';
import axios from 'axios';

import {store} from '../state-management/redux/store';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {
  BUG_SERVER,
  INVALID_TOKEN,
  NETWORK_ERROR,
  USER_INVALID,
  USER_NOT_REQUEST_FRIEND,
  errors,
} from '../utils/constants';
import AlertMessage from '../components/base/AlertMessage';

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
      if (auth) {
        config.headers.Authorization = `Bearer ${
          store.getState().userInfo.token
        }`;
      }
      return config;
    },
    error => {
      console.log('error frontend');
      AlertMessage('Vui lòng kiểm tra lại mạng!');
      Promise.reject(error);
    },
  );
  api.interceptors.response.use(
    (
      /**
       * Nếu response nhận về là json về convert về dạng camelCase
       * @author NTVu - 14/09/2023
       * @param {import('axios').AxiosResponse} response
       * @returns {import('axios').AxiosResponse}
       */
      response: import('axios').AxiosResponse,
    ): import('axios').AxiosResponse => {
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
        console.log('error api', JSON.stringify(error));
      }
      if (error.name.includse('Network')) {
        AlertMessage('Vui lòng kiểm tra lại mạng!');
        return Promise.reject({
          message: 'Kết nối mạng không ổn định.',
          code: NETWORK_ERROR,
        });
      }

      const {response} = error;

      AlertMessage(
        errors[response.data.code.toString()] || 'Lỗi chưa xác định',
      );
      if (response.data.code == INVALID_TOKEN.toString()) {
        store.dispatch(userInfoActions.logOut());
      }
      return Promise.reject({
        code: response.data.code,
        message: response.data.message,
      });
    },
  );

  return api;
};
