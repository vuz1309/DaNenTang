import {TypeSearch} from '../interfaces/search';
import {requestJSONWithAuth} from '../request';

export const searchRequest = (props: TypeSearch) => {
  return requestJSONWithAuth('/search', props);
};
export const getSavedSearchRequest = (
  body: {index: any; count: any} = {index: '0', count: '10'},
) => {
  return requestJSONWithAuth('/get_saved_search', body);
};
