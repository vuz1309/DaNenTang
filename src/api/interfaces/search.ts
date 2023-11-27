import {AxiosRequestConfig} from 'axios';

export interface TypeSearch extends AxiosRequestConfig {
  keyword: string;
  user_id: any;
  index: any;
  count: any;
}
