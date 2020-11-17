import { ActionTypes, PostActionTypes } from './types';
import initialState from './state';
import { cloneDeep } from 'lodash';

export default function (state = initialState, action: PostActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_POSTS_LIST:
      return {
        ...state,
        list: [...action.payload.posts],
      };
    case ActionTypes.SET_USER_POSTS_LIST:
      return {
        ...state,
        userPosts: [...action.payload.posts],
      };
    case ActionTypes.UPDATE_POST:
      const userPosts = cloneDeep(
        [...state.userPosts].map((post) =>
          post.id === action.payload.postId ? action.payload.post : post,
        ),
      );

      const list = cloneDeep(
        [...state.list].map((post) =>
          post.id === action.payload.postId ? action.payload.post : post,
        ),
      );

      return {
        ...state,
        userPosts,
        list,
      };
    case ActionTypes.DELETE_POST:
      const postId = action.payload.postId;

      return {
        ...state,
        list: state.list.filter((post) => post.id !== postId),
      };
    default:
      return state;
  }
}
