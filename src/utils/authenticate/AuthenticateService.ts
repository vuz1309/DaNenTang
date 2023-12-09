import {useState} from 'react';
import {TypeLoginRequest, TypeRegisterRequest} from '../../api/interfaces/auth';
import {loginRequest, registerRequest, setDevToken} from '../../api/modules/authenticate';
import {getDeviceId} from 'react-native-device-info';
import AlertMessage from '../../components/base/AlertMessage';
import {store} from '../../state-management/redux/store';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import {userSavedInfoActions} from '../../state-management/redux/slices/UserSavedSlice';
import TokenProvider from './TokenProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTokens } from '../../hooks/useAppToken';
import { logger } from '../helper';

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
  handlerLogin: (data: any) => {
    store.dispatch(
      userInfoActions.loginSuccess({
        token: data?.data?.token,
        user: data?.data,
      }),
    );
  },
};

export const useLogin = (): LoginRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const requestLogin = async (options: any) => {
    const loginParams = await {
      ...options,
      uuid: getDeviceId(),
    };
    try {
      setLoading(true);

      const response: any = await loginRequest(loginParams);

      await handleLoginSuccess(response);
      store.dispatch(
        userSavedInfoActions.addUserSaved({
          email: loginParams.email,
          password: loginParams.password,
          // username: response.data?.data?.username,
          // avatar: response.data?.data?.avatar,
          // id: response.data?.data?.id,
          ...response.data?.data,
        }),
      );
    } catch (e: any) {
      setError(e);
      AlertMessage(e?.message || 'Đăng nhập thất bại', 'Thất bại!');
    } finally {
      setLoading(false);
    }
  };
  const  handleLoginSuccess = async ({data}: {data: any}) => {
    const { saveFcmToken, getFcmToken } = useAppTokens(); // save local storage
    AuthenticateService.handlerLogin(data);
    try{
      const fcmToken = await getFcmToken() || '';
      logger('fcmToken: ', true, fcmToken);
      await setDevToken({devtype: "1", devtoken : fcmToken})
    }catch(err){
      
    }
  };
  return {
    loading,
    requestLogin,
    error,
    handleLoginSuccess,
  };
};

export default AuthenticateService;
