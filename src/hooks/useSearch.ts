/* eslint-disable prettier/prettier */
import React from 'react';
import {searchRequest} from '../api/modules/search';
import {requestJSONWithAuth} from '../api/request';
import {logger} from '../utils/helper';

/* eslint-disable @typescript-eslint/no-unused-vars */
interface IUseSearch {
  onComplete: (response: any) => void,
  keyword: string,
}
const useSearch = async (props: IUseSearch) => {
  const {onComplete, keyword} = props;
  try {
    const response = await searchRequest({
      keyword: keyword,
      user_id: 182,
      index: 0,
      count: 10,
    });
    logger('@Response data: ', true, response.data.data);
    onComplete(response.data.data);
  } catch (err) {
    logger('err call api: ', true, err);
    onComplete([]);
  }
};

export default useSearch;
