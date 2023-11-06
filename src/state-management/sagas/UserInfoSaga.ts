import {put, takeLatest} from 'redux-saga/effects';
import {userInfoActions} from '../redux/slices/UserInfoSlice';

function* handleGetUserInfoRequest({payload}: any) {
  try {
  } catch (error) {
    yield put(userInfoActions.getUserInfoFailed(error));
  }
}

export default function* userInfoSaga() {
  yield takeLatest(
    userInfoActions.getUserInfoRequest.type,
    handleGetUserInfoRequest,
  );
}
