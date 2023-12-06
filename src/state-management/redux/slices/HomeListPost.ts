import {Action, AnyAction} from 'redux';
import {CommonStatus} from './types';
import {CaseReducer, PayloadAction, createSlice} from '@reduxjs/toolkit';
import {generatePersistConfig} from '../../../utils/helper';
import persistReducer from 'redux-persist/es/persistReducer';

export interface IPostsState {
  posts: Array<any>;
  paramsConfig: any;
  status?: CommonStatus;
  error?: any;
  lastId: string;
}

type Reducer<A extends Action<any> = AnyAction> = CaseReducer<IPostsState, A>;

const initialState: IPostsState = {
  status: CommonStatus.IDLE,
  posts: [],
  paramsConfig: {
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    last_id: '9999',
    index: '0',
    count: '20',
  },
  lastId: '9999',
};
const setParams: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.paramsConfig = payload;
};
const setLastId: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.lastId = payload;
};
const removePost: Reducer<PayloadAction<any>> = (state, {payload}) => {
  const {postId} = payload;

  state.posts.splice(
    state.posts.findIndex(p => p.id === postId),
    1,
  );
};
const shiftPost: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.posts = [payload, ...state.posts];
};
const addPosts: Reducer<PayloadAction<any>> = (state, {payload}) => {
  const posts = state.posts;
  const listPosts = payload.filter(
    (post: any) => !posts.find(p => p.id === post.id),
  );
  state.posts = [...posts, ...listPosts];
};
const setPosts: Reducer<PayloadAction<any>> = (state, {payload}) => {
  state.posts = payload;
};
const updatePost: Reducer<PayloadAction<any>> = (state, {payload}) => {
  const post = state.posts.find(p => p.id == payload.id);
  if (post)
    Object.keys(payload).forEach(key => {
      post[key] = payload[key];
    });
};
const persisConfig = generatePersistConfig('postInfo', ['posts']);

const postsSlice = createSlice({
  name: 'postInfo',
  initialState,
  reducers: {
    removePost,
    addPosts,
    setPosts,
    updatePost,
    setParams,
    setLastId,
    shiftPost,
  },
});

export const postInfoActions = postsSlice.actions;
export default persistReducer<IPostsState>(persisConfig, postsSlice.reducer);
