export const BE_URL = 'https://it4788.catan.io.vn';

import axios from 'axios';

import {store} from '../state-management/redux/store';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {INVALID_TOKEN, errors} from '../utils/constants';
import AlertMessage from '../components/base/AlertMessage';
import {ToastAndroid} from 'react-native';
import {formatNumberSplitBy} from '../helpers/helpers';

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
      console.log('res:', response.data);
      if (response.data.coins) {
        console.log('change coins:', response.data?.coins);
        handleCoinsChange(response.data?.coins);
      }
      if (response.data?.data?.coins) {
        if (
          response.config.url &&
          response.config.url.includes('get_user_info')
        )
          return response;

        handleCoinsChange(response.data?.data?.coins);
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

export function handleCoinsChange(coins: string) {
  const currentCoins = Number(store.getState().userInfo.user?.coins);
  const updatedCoins = Number(coins);
  if (currentCoins < updatedCoins) {
    // case nạp coins
    ToastAndroid.showWithGravity(
      `Nạp thành công ${formatNumberSplitBy(
        updatedCoins - currentCoins,
      )} coins, số coins hiện tại: ${formatNumberSplitBy(
        Number(updatedCoins),
      )}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  } else if (currentCoins > updatedCoins) {
    ToastAndroid.showWithGravity(
      `Bạn vừa bị trừ ${formatNumberSplitBy(
        -updatedCoins + currentCoins,
      )} coins, số coins hiện tại: ${formatNumberSplitBy(
        Number(updatedCoins),
      )}`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );
  }
  store.dispatch(userInfoActions.updateCoin(updatedCoins.toString()));
}
