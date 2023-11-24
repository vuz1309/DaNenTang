import {authAndFileRequest, requestJSONWithAuth} from '../request';
export const addPost = async (post: any) => {
  return (await authAndFileRequest()).post('/add_post', post);
};

export const getListPost = (
  params: {
    user_id: string;
    in_campaign: string;
    campaign_id: string;
    latitude: string;
    longitude: string;
    last_id: string;
    index: string;
    count: string;
  } = {
    user_id: '114',
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    last_id: '6',
    index: '0',
    count: '20',
  },
) => {
  return requestJSONWithAuth('/get_list_posts', params);
};

export const getPostRequest = (params: {id: string}) => {
  return requestJSONWithAuth('/get_post', params);
};

export const editPostRequest = async (post: {
  image?: Array<string>;
  video?: any;
  described?: string;
  status?: string;
  auto_accept?: string;
  id: string;
  image_del: string;
  image_sort: string;
}) => {
  return (await authAndFileRequest()).post('/edit_post', post);
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
