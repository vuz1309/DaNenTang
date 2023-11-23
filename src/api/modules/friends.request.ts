import {requestJSONWithAuth} from '../request';

export const getAllFriends = (
  params: {
    index: string;
    count: string;
    user_id: string;
  } = {
    index: '0',
    count: '20',
    user_id: '114',
  },
) => {
  return requestJSONWithAuth('get_user_friends', params);
};

export const getRequestFriends = (
  params: {
    index: string;
    count: string;
  } = {
    index: '0',
    count: '20',
  },
) => {
  return requestJSONWithAuth('get_request_friends', params);
};

export const setRequestFriend = (params: {user_id: string}) => {
  return requestJSONWithAuth('set_request_friend', params);
};

export const setAcceptFriend = (
  params: {user_id: string; is_accept: string} = {user_id: '0', is_accept: '1'},
) => {
  return requestJSONWithAuth('set_accept_friend', params);
};
export const getSuggestionFriend = (
  params: {index: string; count: string} = {index: '0', count: '5'},
) => {
  return requestJSONWithAuth('get_suggested_friends', params);
};
