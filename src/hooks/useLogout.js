import React from 'react';
import {logout} from '../api/modules/userProfile.request';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {store} from '../state-management/redux/store';

export const useLogout = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const onLogout = async () => {
    try {
      setLoading(true);
      logout();
      store.dispatch(userInfoActions.logOut());
      store.dispatch(postInfoActions.setPosts([]));
      store.dispatch(postInfoActions.setLastId('99999'));

      // store.dispatch(
      //   postInfoActions.setParams({
      //     in_campaign: '1',
      //     campaign_id: '1',
      //     latitude: '1.0',
      //     longitude: '1.0',
      //     last_id: '99999',
      //     index: '0',
      //     count: '20',
      //   }),
      // );
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    onLogout,
    loading,
    error,
  };
};
