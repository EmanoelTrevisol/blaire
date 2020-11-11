import { ActionTypes } from './types';

export function setAppLoading(loading: boolean) {
  return {
    type: ActionTypes.SET_APP_LOADING,
    payload: {
      app: loading,
    },
  };
}

export function setNewsLoading(loading: boolean) {
  return {
    type: ActionTypes.SET_NEWS_LOADING,
    payload: {
      news: loading,
    },
  };
}

export function setPostsLoading(loading: boolean) {
  return {
    type: ActionTypes.SET_POSTS_LOADING,
    payload: {
      posts: loading,
    },
  };
}
