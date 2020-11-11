import { ActionTypes, PostActionTypes } from './types';
import initialState from './state';

export default function (state = initialState, action: PostActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_POSTS_LIST:
      return {
        ...state,
        list: [...action.payload.posts],
      };
    case ActionTypes.SET_POST_DETAIL:
      return {
        ...state,
        detail: { ...action.payload.post },
      };
    case ActionTypes.UPDATE_POST:
      // TODO: define update logic
      return {
        ...state,
        // action.payload,
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
