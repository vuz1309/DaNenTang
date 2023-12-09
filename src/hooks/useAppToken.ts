import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { LocalStorage, StorageKey } from "../utils/localStorage";

export const useAppTokens = () => {
    const AuthTokenKey = StorageKey.AUTH_TOKEN;
    const FcmTokenKey = StorageKey.FCM_TOKEN;
  
    return {
      saveAuthToken: async (authToken: AnyAsyncThunk) => {
        await LocalStorage.save({
          key: AuthTokenKey,
          data: authToken,
        });
      },
  
      getAuthToken: async () => {
        return new Promise((resolve, reject) => {
          return LocalStorage.load({ key: AuthTokenKey })
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
  
      clearAuthToken: async () => {
        LocalStorage.remove({
          key: AuthTokenKey,
        });
      },
  
      saveFcmToken: async (token: any) => {
        await LocalStorage.save({
          key: FcmTokenKey,
          data: token,
        });
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
    };
  };