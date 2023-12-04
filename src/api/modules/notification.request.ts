import {requestJSONWithAuth} from '../request';

export const getNotifications = (body: {index: string; count: string}) => {
  return requestJSONWithAuth('/get_notifications', body);
};

export const checkNewNotifications = (body: {
  last_id: string;
  category_id: string;
}) => {
  return requestJSONWithAuth('/check_new_items', body);
};
