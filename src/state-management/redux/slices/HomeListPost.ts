import {Action, AnyAction} from 'redux';
import {CommonStatus} from './types';
import {CaseReducer, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {generatePersistConfig} from '../../../utils/helper';
import persistReducer from 'redux-persist/es/persistReducer';

export interface IPostsState {
  posts: Array<any>;
  status?: CommonStatus;
  error?: any;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<IPostsState, A>;

const initialState: IPostsState = {
  status: CommonStatus.IDLE,
  posts: [],
};

const removePost: Reducer<PayloadAction<any>> = (state, {payload}) => {
  const {postId} = payload;
  console.log('remove post', postId);
  state.posts = state.posts?.filter(p => p !== postId);
};
const addPosts: Reducer<PayloadAction<any>> = (state, {payload}) => {
  console.log('set post', payload);
  const posts = state.posts;
  const listPosts = payload.filter(
    (post: any) => !posts.find(p => p.id === post.id),
  );
  state.posts = [...posts, ...listPosts];
};
const setPosts: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.posts = payload;
};
const persisConfig = generatePersistConfig('postInfo', ['post']);

const postsSlice = createSlice({
  name: 'postInfo',
  initialState,
  reducers: {
    removePost,
    addPosts,
    setPosts,
  },
});

export const postInfoActions = postsSlice.actions;
export default persistReducer<IPostsState>(persisConfig, postsSlice.reducer);
