import {authAndFileRequest} from '../request';
export const addPost = (post: any) => {
  return authAndFileRequest.post('/add_post', post);
};
