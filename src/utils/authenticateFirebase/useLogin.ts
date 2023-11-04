import {useState} from 'react';
import {TypeLoginRequest} from '../../api/interfaces/auth';
import {getDeviceId} from '../helper';
import AlertMessage from '../../components/base/AlertMessage';
import {store} from '../../state-management/redux/store';
import {userInfoActions} from '../../state-management/redux/slices/UserInfoSlice';
import TokenProvider from '../authenticate/TokenProvider';
import {logger} from '../helper';
import {getAsyncData, storeStringAsyncData} from '../authenticate/LocalStorage';
import {SUCCESS_CODE} from '../constants';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

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

export const useLogin = (
  auth: FirebaseAuthTypes.Module,
  db: FirebaseFirestoreTypes.Module,
): LoginRequest => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestLogin = async (options: any) => {
    const loginParams = await {
      ...options,
      device_id: await getDeviceId(),
    };
    try {
      setLoading(true);
      auth
        .signInWithEmailAndPassword(loginParams.email, loginParams.password)
        .then(async userCredential => {
          const user: any = userCredential.user;
          const idToken = await user.getIdToken();
          AuthenticateService.handlerLogin(idToken, user.uid);

          // Lưu email vào async store
          storeStringAsyncData('email', loginParams.email);

          // Sau khi đăng nhập thành công, lấy các bản ghi từ collections xem user đã đăng nhập trên thiết bị khác chưa
          const userDevicesRef = db
            .collection('userDevices')
            .doc(loginParams.email);
          try {
            const userDevicesDoc = await userDevicesRef.get();
            if (userDevicesDoc.exists) {
              // Bản ghi tồn tại, có nghĩa người dùng đã đăng nhập từ nơi khác
              const userDevicesData: any = userDevicesDoc.data();

              if (userDevicesData.deviceId != loginParams.device_id) {
                // Đăng nhập trên thiết bị khác
                logger(
                  'Đăng nhập trên thiết bị khác: ',
                  userDevicesData.deviceId,
                );
                //Xử lý push notifications
              }
            }
            await userDevicesRef.set({
              email: loginParams.email,
              deviceId: loginParams.device_id,
            });
          } catch (error) {
            console.error('Lỗi khi truy xuất dữ liệu từ Firestore:', error);
          }
        })
        .catch(err => String(err));
    } catch (e) {
      AlertMessage(String(e));
    } finally {
      setLoading(false);
    }
  };
  const handleLoginSuccess = async (userCredential: any) => {
    const user: any = userCredential.user;
    const idToken = await user.getIdToken();
    AuthenticateService.handlerLogin(idToken, user.uid);
    const deviceId: string = await getDeviceId();
    // Lưu email vào async store
    storeStringAsyncData('email', user.email);

    // Sau khi đăng nhập thành công, lấy các bản ghi từ collections xem user đã đăng nhập trên thiết bị khác chưa
    const userDevicesRef = db.collection('userDevices').doc(user.email);
    try {
      const userDevicesDoc = await userDevicesRef.get();
      if (userDevicesDoc.exists) {
        // Bản ghi tồn tại, có nghĩa người dùng đã đăng nhập từ nơi khác
        const userDevicesData: any = userDevicesDoc.data();

        if (userDevicesData.deviceId != deviceId) {
          // Đăng nhập trên thiết bị khác
          logger('Đăng nhập trên thiết bị khác: ', userDevicesData.deviceId);
          //Xử lý push notifications
        }
      }
      await userDevicesRef.set({
        email: user.email,
        deviceId,
      });
    } catch (error) {
      console.error('Lỗi khi truy xuất dữ liệu từ Firestore:', error);
    }
  };
  return {
    loading,
    requestLogin,
    error,
    handleLoginSuccess,
  };
};

export const useLogout = (
  auth: FirebaseAuthTypes.Module,
  db: FirebaseFirestoreTypes.Module,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestLogout = async () => {
    try {
      setLoading(true);
      auth
        .signOut()
        .then(async () => {
          const emailUser = await getAsyncData('email');
          const userDevicesRef = db.collection('userDevices').doc(emailUser);

          try {
            await userDevicesRef.delete();
            AuthenticateService.logOut();
          } catch (error) {
            console.error('Lỗi khi truy xuất dữ liệu từ Firestore:', error);
          }
        })
        .catch(err => String(err));
    } catch (e) {
      AlertMessage(String(e));
    } finally {
      setLoading(false);
    }
  };
  return {
    requestLogout,
    loading,
    error,
  };
};
