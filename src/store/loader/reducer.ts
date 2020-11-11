import initialState from './state';
import { ActionTypes, LoaderActionTypes } from './types';

export default function (state = initialState, action: LoaderActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_APP_LOADING:
      return {
        ...state,
        app: action.payload.app,
      };
    case ActionTypes.SET_NEWS_LOADING:
      return {
        ...state,
        news: action.payload.news,
      };
    case ActionTypes.SET_POSTS_LOADING:
      return {
        ...state,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
}
