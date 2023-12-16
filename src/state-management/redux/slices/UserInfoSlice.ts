import {
  Action,
  AnyAction,
  CaseReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {CommonStatus} from './types';
import {generatePersistConfig, logger} from '../../../utils/helper';
import {store} from '../store';
import {userSavedInfoActions} from './UserSavedSlice';

export interface IUser {
  id?: string;
  username?: string;
  avatar?: string;
  coins: string;
  active?: string;
}
export interface IPushSettings {
  like_comment?: string;
  from_friends?: string;
  requested_friend?: string;
  suggested_friend?: string;
  birthday?: string;
  video?: string;
  report?: string;
  sound_on?: string;
  notification_on?: string;
  vibrant_on?: string;
  led_on?: string;
}
export interface IUserInfoState {
  token?: string;
  user?: IUser;
  pushSettings?: IPushSettings;
  status: CommonStatus;
  error?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<
  IUserInfoState,
  A
>;

const initialState: IUserInfoState = {
  status: CommonStatus.IDLE,
};

const registerUserSuccess: Reducer<
  PayloadAction<Pick<IUserInfoState, 'token' | 'user'>>
> = (state, {payload}) => {
  state.user = payload.user;
  state.token = payload.token;
};

const loginSuccess: Reducer<
  PayloadAction<Pick<IUserInfoState, 'token' | 'user'>>
> = (state, {payload}) => {
  state.user = payload.user;
  state.token = payload.token;
};

const updateUserInfo: Reducer<PayloadAction<IUser>> = (state, {payload}) => {
  state.user = {...state.user, ...payload};
};
const getUserInfoRequest: Reducer<
  PayloadAction<Pick<IUserInfoState, 'token' | 'user'>>
> = state => {
  delete state.error;
};

const getUserInfoSuccess: Reducer<PayloadAction<IUser>> = (
  state,
  {payload},
) => {
  state.user = payload;
};

const getUserInfoFailed: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.status = CommonStatus.ERROR;
  state.error = payload;
};

const updateToken: Reducer<
  PayloadAction<Pick<IUserInfoState, 'token' | 'user'>>
> = (state, {payload}) => {
  state.token = payload.token;

  logger('reducer: ' + payload.token);
  logger('state: ' + state.token);
};

const logOut: Reducer = state => {
  delete state.token;
  delete state.user;
  delete state.pushSettings;
};
const updateCoin: Reducer<PayloadAction<string>> = (state, {payload}) => {
  // console.log('update coins:', payload);
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (state.user) {
    // Cập nhật số coin trong state
    state.user.coins = payload;
  }
};
const savePushSettings: Reducer<PayloadAction<IPushSettings>> = (
  state,
  {payload},
) => {
  console.log('update push:', payload);
  // Kiểm tra xem người dùng đã đăng nhập hay chưa
  if (state.user) {
    // Cập nhật số coin trong state
    state.pushSettings = payload;
  }
};
const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    getUserInfoRequest,
    registerUserSuccess,
    getUserInfoSuccess,
    getUserInfoFailed,
    updateToken,
    logOut,
    loginSuccess,
    updateUserInfo,
    updateCoin,
    savePushSettings,
  },
});

const persistConfig = generatePersistConfig('userInfo', [
  'token',
  'user',
  'pushSettings',
]);

export const userInfoActions = userInfoSlice.actions;

export default persistReducer<IUserInfoState>(
  persistConfig,
  userInfoSlice.reducer,
);
