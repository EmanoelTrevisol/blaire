import initialState from './state';
import { ActionTypes, NewsActionTypes } from './types';

export default function (state = initialState, action: NewsActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_NEWS_LIST:
      return {
        ...state,
        list: action.payload.news,
      };
    default:
      return state;
  }
}
