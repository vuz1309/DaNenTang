import {requestJSONWithAuth} from '../request';

export const getUserInfo = (body: {user_id: string}) => {
  return requestJSONWithAuth('/get_user_info', body);
};

/**
 * Need multipart/formdata
 * @param body
 * Field: username, description, avatar, address, city, country, cover_image: link,
 * @returns
 */
export const setUserInfo = (body: FormData) => {
  return requestJSONWithAuth('/set_user_info', body);
};

/**
 * Need multipart/formdata
 * @param body
 * Field: username, avatar
 * @returns
 */
export const changeProfileAfterSignup = (body: FormData) => {
  return requestJSONWithAuth('/change_profile_after_signup', body);
};
