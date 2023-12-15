import {AxiosRequestConfig} from 'axios';

export interface TypeSearch extends AxiosRequestConfig {
  keyword: any;
  user_id: any;
  index: any;
  count: any;
}
