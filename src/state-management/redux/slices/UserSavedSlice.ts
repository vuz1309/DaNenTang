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

export interface IUserSaved {
  email: string;
  password: string;
  username: string;
  avatar: string;
  id: string;
}

export interface IUserSavedState {
  userSaved: Array<IUserSaved>;
  status: CommonStatus;
  error?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<
  IUserSavedState,
  A
>;

const initialState: IUserSavedState = {
  status: CommonStatus.IDLE,
  userSaved: [],
};

const addUserSaved: Reducer<PayloadAction<any>> = (state, {payload}) => {
  const isExists = state.userSaved.find(user => user.id === payload.id);
  if (!isExists) {
    state.userSaved = [...state.userSaved, payload];
  }
};
const removeUserSaved: Reducer<PayloadAction<any>> = (state, {payload}) => {
  console.log('paylaod remove:', payload);
  const index = state.userSaved.findIndex(user => user.id === payload);
  if (index >= 0) {
    state.userSaved.splice(index, 1);
  }
};

const userSavedInfo = createSlice({
  name: 'userSavedInfo',
  initialState,
  reducers: {addUserSaved, removeUserSaved},
});

const persistConfig = generatePersistConfig('userSavedInfo', ['userSaved']);

export const userSavedInfoActions = userSavedInfo.actions;

export default persistReducer<IUserSavedState>(
  persistConfig,
  userSavedInfo.reducer,
);
