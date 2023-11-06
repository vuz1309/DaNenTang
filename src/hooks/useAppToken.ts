import { LocalStorage, StorageKey } from "../utils/localStorage"
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export const useAppToken = () => {
    const AuthTokenKey = StorageKey.AUTH_TOKEN;
    const FcmTokenKey = StorageKey.FCM_TOKEN;
    return {
        saveAuthToken: async (authToken: AnyAsyncThunk) => {
            await LocalStorage.save({
                key: AuthTokenKey,
                data: authToken
            })
        },
        getAuthToken: async () => {
            return new Promise((resolve, reject) => {
                return LocalStorage.load({ key: FcmTokenKey })
                    .then((res) => resolve(res))
                    .catch((err) => {
                        switch (err.name) {
                            case 'NotFoundError': break;
                            case 'ExpiredError': break;
                        }
                        return resolve(null);
                    })
            })
        },
        clearAuthToken: async () => {
            LocalStorage.remove({
                key: AuthTokenKey,
            });
        },
        saveFCMToken: async (fcmToken: AnyAsyncThunk) => {
            await LocalStorage.save({
                key: FcmTokenKey,
                data: fcmToken
            })
        },
        getFcmToken: async () => {
            return new Promise((resolve, reject) => {
                return LocalStorage.load({ key: FcmTokenKey })
                    .then((res) => resolve(res))
                    .catch((err) => {
                        switch (err.name) {
                            case 'NotFoundError':
                                break;
                            case 'ExpiredError':
                                break;
                        }
                        return resolve(null);
                    });
            });
        },
    }
}