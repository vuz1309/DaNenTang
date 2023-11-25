import {configureStore} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import userInfoReducer, {IUserInfoState} from './slices/UserInfoSlice';
import postInfoReducer, {IPostsState} from './slices/HomeListPost';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  userInfo: userInfoReducer,
  postInfo: postInfoReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(logger)
      .prepend(sagaMiddleware),
  devTools: __DEV__,
});

export interface FacebookRootState {
  userInfo: IUserInfoState;
  postInfo: IPostsState;
}

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
