import initialState from './state';
import { ActionTypes, FormActionTypes } from './types';

export function formReducer(
  state = initialState,
  action: FormActionTypes,
): typeof initialState {
  switch (action.type) {
    case ActionTypes.SET_VALUE:
      return {
        ...state,
        value: action.payload.value,
      };
    case ActionTypes.SET_DIRTY:
      return {
        ...state,
        dirty: action.payload.dirty,
      };
    case ActionTypes.SET_ERRORS:
      return {
        ...state,
        error: action.payload.error,
        errors: {
          ...state.errors,
          ...(action.payload.errors || {}),
        },
      };
    default:
      return state;
  }
}
