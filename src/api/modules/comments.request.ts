import {requestJSONWithAuth} from '../request';

export const getMarkComment = (body: {
  id: string;
  index: string;
  count: string;
}) => {
  return requestJSONWithAuth('/get_mark_comment', body);
};
