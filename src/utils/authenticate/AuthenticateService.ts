import { useState } from 'react';
import { TypeLoginRequest } from '../../api/interfaces/auth';
import { loginRequest } from '../../api/modules/authenticate';
import { getDeviceId } from 'react-native-device-info';
import AlertMessage from '../../components/base/AlertMessage';
import { store } from '../../state-management/redux/store';
import { userInfoActions } from '../../state-management/redux/slices/UserInfoSlice';
import TokenProvider from './TokenProvider';
import { logger } from '../helper';
import { storeStringAsyncData } from './LocalStorage';
import { SUCCESS_CODE } from '../constants';


interface LoginRequest {
    loading: boolean;
    requestLogin: (values: TypeLoginRequest) => Promise<void>;
    error: boolean;
    handleLoginSuccess: (response: any) => void;
}
export const isLogin = () => {
    const { userInfo } = store.getState();
    return !!userInfo?.token;
};


const AuthenticateService = {
    logOut: () => {
        TokenProvider.clearToken();
        store.dispatch(userInfoActions.logOut());
    },
    handlerLogin: (token: string, id: number) => {
        store.dispatch(
            userInfoActions.updateToken({ token, user: { id } }),
        );
    },
};

export const useLogin = (): LoginRequest => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const requestLogin = async (options: any) => {
        const loginParams = await {
            ...options,
            device_id: await getDeviceId()
        };
        try {
            setLoading(true);
            const response: any = await loginRequest(loginParams);
            
            /** 
             * Author: Hieutm
             * Keep Login : Default: True
            */
            await storeStringAsyncData('email', options.username);
            await storeStringAsyncData('password', options.password);
            
            handleLoginSuccess(response);

        } catch (e) {
            AlertMessage(String(e));
        } finally {
            setLoading(false);
        }
    }
    const handleLoginSuccess = (response: any) => {
        logger("Login Success!")
        logger(response?.data)
        store.dispatch(
            userInfoActions.getUserInfoRequest({
                token: response?.data?.token,
                user: { id: response?.data?.id },
            }),
        );
        AuthenticateService.handlerLogin(
            response?.data?.token,
            response?.data?.id,
        );
    };
    return {
        loading,
        requestLogin,
        error,
        handleLoginSuccess,
    };
}

export default AuthenticateService;
