/* eslint-disable prettier/prettier */
import React from 'react';
import {searchRequest} from '../api/modules/search';
import {requestJSONWithAuth} from '../api/request';
import {logger} from '../utils/helper';

/* eslint-disable @typescript-eslint/no-unused-vars */
interface IUseSearch {
  onComplete: (response: any) => void;
  keyword: any;
}
const useSearch = async (props: IUseSearch) => {
  const {onComplete, keyword} = props;
  logger('keyword: ', true, keyword);
  try {
    const response = await searchRequest({
      keyword: keyword,
      user_id: null,
      index: 0,
      count: 20,
    });

    onComplete(response.data.data);
  } catch (err) {
    logger('err call api: ', true, err);
    onComplete([]);
  }
};

export default useSearch;
