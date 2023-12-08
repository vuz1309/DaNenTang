import {authAndFileRequest, requestJSONWithAuth} from '../request';
export const addPost = async (post: any) => {
  return authAndFileRequest.post('/add_post', post);
};

export const getListPost = (
  params: {
    user_id?: string;
    in_campaign?: string;
    campaign_id?: string;
    latitude?: string;
    longitude?: string;
    last_id?: string;
    index: string;
    count: string;
  } = {
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',

    index: '0',
    count: '20',
  },
) => {
  return requestJSONWithAuth('/get_list_posts', params);
};

export const getPostRequest = (params: {id: string}) => {
  return requestJSONWithAuth('/get_post', params);
};

export const editPost = async (post: FormData) => {
  return authAndFileRequest.post('/edit_post', post);
};

export const deletePostRequest = (body: {id: string}) => {
  return requestJSONWithAuth('/delete_post', body);
};

export const reportPostRequest = (body: {
  id: string;
  subject: string;
  details: string;
}) => {
  return requestJSONWithAuth('/report_post', body);
};

export const getListVideos = (body: {
  user_id: string;
  in_campaign: string;
  campaign_id: string;
  latitude: string;
  longitude: string;
  last_id: string;
  index: string;
  count: string;
}) => {
  return requestJSONWithAuth('/get_list_videos', body);
};

export const getNewPosts = (body: {count: string}) => {
  return requestJSONWithAuth('/get_new_posts', body);
};
export const setViewdPost = (body: {id: string}) => {
  return requestJSONWithAuth('/set_viewed_post', body);
};
