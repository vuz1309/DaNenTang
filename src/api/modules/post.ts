import {authAndFileRequest, authRequestJSON} from '../request';
export const addPost = async (post: any) => {
  return (await authAndFileRequest()).post('/add_post', post);
};

export const getListPost = async (
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
  console.log(params);
  return (await authRequestJSON()).post('/get_list_posts', params);
};
