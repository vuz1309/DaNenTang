import {useState} from 'react';
import {TypeLoginRequest, TypeRegisterRequest} from '../../api/interfaces/auth';
import {loginRequest, registerRequest} from '../../api/modules/authenticate';
import {getDeviceId} from 'react-native-device-info';
import AlertMessage from '../../components/base/AlertMessage';
import {store} from '../../state-management/redux/store';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import {userSavedInfoActions} from '../../state-management/redux/slices/UserSavedSlice';
import TokenProvider from './TokenProvider';
import {logger} from '../helper';
import {storeStringAsyncData} from './LocalStorage';

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
  handlerLogin: (token: string, id: string) => {
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

      const response: any = await loginRequest(loginParams);

      handleLoginSuccess(response);
      store.dispatch(
        userSavedInfoActions.addUserSaved({
          email: loginParams.email,
          password: loginParams.password,
          username: response.data?.data?.username,
          avatar: response.data?.data?.avatar,
          id: response.data?.data?.id,
        }),
      );
    } catch (e) {
      console.log(String(e));
    } finally {
      setLoading(false);
    }
  };
  const handleLoginSuccess = ({data}: {data: any}) => {
    logger('Login Success!');
    logger(data?.data);

    store.dispatch(
      userInfoActions.loginSuccess({
        token: data?.data?.token,
        user: data?.data,
      }),
    );

    AuthenticateService.handlerLogin(data?.data?.token, data?.data?.id);
  };
  return {
    loading,
    requestLogin,
    error,
    handleLoginSuccess,
  };
};

export default AuthenticateService;
