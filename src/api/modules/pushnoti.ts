import { TypePushNotificationRequest } from '../interfaces/pushnoti';
import {serverRequest} from '../request';

export const pushnotiRequest = (params: TypePushNotificationRequest) =>
serverRequest.post('/fcm/send', params);
