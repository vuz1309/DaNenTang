import {
  Action,
  AnyAction,
  CaseReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {CommonStatus} from './types';
import {generatePersistConfig} from '../../../utils/helper';

export interface INotification {
  name: string;
  number: number;
}

export interface INotificationState {
  status: CommonStatus;
  error?: any;
  newNotiOfTabs: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<
  INotificationState,
  A
>;

const initialState: INotificationState = {
  status: CommonStatus.IDLE,
  newNotiOfTabs: {},
};

const setNotification: Reducer<PayloadAction<INotification>> = (
  state,
  {payload},
) => {
  state.newNotiOfTabs[payload.name] = payload.number;
};

const notificationInfo = createSlice({
  name: 'notificationInfo',
  initialState,
  reducers: {setNotification},
});

const persistConfig = generatePersistConfig('notificationInfo', []);

export const notificationInfoActions = notificationInfo.actions;

export default persistReducer<INotificationState>(
  persistConfig,
  notificationInfo.reducer,
);
