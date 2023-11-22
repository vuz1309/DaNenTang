import {useState} from 'react';
import {TypeLoginRequest, TypeRegisterRequest} from '../../api/interfaces/auth';
import {loginRequest, registerRequest} from '../../api/modules/authenticate';
import {getDeviceId} from 'react-native-device-info';
import AlertMessage from '../../components/base/AlertMessage';
import {store} from '../../state-management/redux/store';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import TokenProvider from './TokenProvider';
import {logger} from '../helper';
import {storeStringAsyncData} from './LocalStorage';
import {setAccessToken} from '../../storage/asyncStorage';

interface LoginRequest {
  loading: boolean;
  requestLogin: (values: TypeLoginRequest) => Promise<void>;
  error: boolean;
  handleLoginSuccess: (response: any) => void;
}

export const isLogin = () => {
  const {userInfo} = store.getState();
  return !!userInfo?.token;
};

const AuthenticateService = {
  logOut: () => {
    TokenProvider.clearToken();
    store.dispatch(userInfoActions.logOut());
  },
  handlerLogin: (token: string, id: number) => {
    logger('handle login: ' + token);

    store.dispatch(userInfoActions.updateToken({token, user: {id}}));
  },
};

export const useLogin = (): LoginRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestLogin = async (options: any) => {
    const loginParams = await {
      ...options,
      uuid: await getDeviceId(),
    };
    try {
      setLoading(true);
      logger(loginParams);
      const response: any = await loginRequest(loginParams);
      logger(response);
      /**
       * Author: Hieutm
       * Keep Login : Default: True
       */
      storeStringAsyncData('email', options.username);
      storeStringAsyncData('password', options.password);

      handleLoginSuccess(response);
    } catch (e) {
      AlertMessage(String(e));
    } finally {
      setLoading(false);
    }
  };
  const handleLoginSuccess = (response: any) => {
    logger('Login Success!');
    logger(response?.data?.data);
    logger('AS1: ' + response.data.data?.token);
    store.dispatch(
      userInfoActions.getUserInfoRequest({
        token: response?.data?.data?.token,
        user: {id: response?.data?.data?.id},
      }),
    );
    setAccessToken(response?.data?.data?.token);
    logger('AS2: ' + response.data.token);
    AuthenticateService.handlerLogin(
      response?.data?.data?.token,
      response?.data?.data?.id,
    );
  };
  return {
    loading,
    requestLogin,
    error,
    handleLoginSuccess,
  };
};

export default AuthenticateService;
