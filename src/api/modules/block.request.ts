import {requestJSONWithAuth} from '../request';

export const setBlockRequest = (body: {user_id: string}) => {
  return requestJSONWithAuth('/set_block', body);
};
export const unBlockRequest = (body: {user_id: string}) => {
  return requestJSONWithAuth('/un_block', body);
};
export const getListBlocksRequest = (
  body: {index: string; count: string} = {index: '0', count: '20'},
) => {
  return requestJSONWithAuth('/get_list_blocks', body);
};
