import initialState from './state';
import { AuthActionTypes, ActionTypes } from './types';

export default function (state = initialState, action: AuthActionTypes) {
  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.CLEAR_USER_INFO:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
