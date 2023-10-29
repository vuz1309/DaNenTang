import { userInfoActions } from "../../state-management/redux/slices/UserInfoSlice";
import { store } from "../../state-management/redux/store";
import { logger } from "../helper";
import { storeStringAsyncData, AsyncStorageKey } from "./LocalStorage";

const TokenProvider = {
    setAllNewToken: (token: string, refreshToken: string) => {
        logger(`Got new token = ${token}`);
        store.dispatch(userInfoActions.updateToken({ token}));
        storeStringAsyncData(AsyncStorageKey.TOKEN, token);
      },
    getToken: () => {
        const {userInfo} = store.getState();
        return userInfo.token || '';
    },
    getUserId: () => {
        const { userInfo } = store.getState();
        return userInfo?.user?.userId || 0;
      },
    clearToken: () => {
        storeStringAsyncData(AsyncStorageKey.TOKEN, '');
      },
}

export default TokenProvider;
