import {TypePushNotificationRequest} from '../interfaces/pushnoti';
import {requestJSONWithAuth, serverRequest} from '../request';

export const pushnotiRequest = (params: TypePushNotificationRequest) =>
  serverRequest.post('/fcm/send', params);

// 0 - off, 1 - on
export const setPushSettingsRequest = (params: {
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
}) => requestJSONWithAuth('/set_push_settings', params);

export const getPushSettingsRequest = () =>
  requestJSONWithAuth('/get_push_settings', {});
