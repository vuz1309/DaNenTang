import {requestJSONWithAuth} from '../request';

export const feelPost = (body: {id: string; type: string}) => {
  return requestJSONWithAuth('/feel', body);
};
/**
 * 
 * @param body example "id": "1",
  "content": "so good",
  "index": "0",
  "count": "10",
  "mark_id": "1",
  "type": "1"
 * @returns 
 */
export const setMarkComments = (body: {
  id: string;
  content: string;
  index: string;
  count: string;
  mark_id: string;
  type: string;
}) => {
  return requestJSONWithAuth('/set_mark_comment', body);
};
/**
 * 
 * @param body EX: "id": "1",
  "index": "0",
  "count": "10"
 * @returns 
 */
export const getMarkComments = (body: {
  id: string;
  index: string;
  count: string;
}) => {
  return requestJSONWithAuth('/get_mark_comment', body);
};
/**
 * 
 * @param body EX: "id": "1",
  "index": "0",
  "count": "10"
 * @returns 
 */
export const getListFeels = (body: {
  id: string;
  index: string;
  count: string;
}) => {
  return requestJSONWithAuth('/get-list-feels', body);
};
