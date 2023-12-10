export const BE_URL = 'https://it4788.catan.io.vn';
import axios from 'axios';

import {store} from '../state-management/redux/store';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {
  BUG_SERVER,
  INVALID_TOKEN,
  USER_INVALID,
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
      if (response.data.data.coins) {
        if (
          response.data.data.id &&
          response.data.data.username &&
          response.data.data.id !=
            store.getState().userInfo?.user?.id?.toString()
        )
          return response;
        store.dispatch(userInfoActions.updateCoin(response.data.data.coins));
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
        console.log(JSON.stringify(error.response));
      }
      const {response} = error;
      if (response.data.code == INVALID_TOKEN.toString()) {
        store.dispatch(userInfoActions.logOut());
      } else {
        AlertMessage(errors[response.data.code] || 'Chưa xác định!', 'Lỗi!');
      }
      return Promise.reject({
        code: response.data.code,
        message: response.data.message,
      });
    },
  );

  return api;
};
