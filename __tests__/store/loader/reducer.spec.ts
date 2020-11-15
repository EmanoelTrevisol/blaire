import reducer from '@store/loader/reducer';
import initialState from '@store/loader/state';
import {
  ActionTypes,
  ISetAppLoadingAction,
  ISetNewsLoadingAction,
  ISetPostsLoadingAction,
} from '@store/loader/types';

let state: typeof initialState;

describe('store/loader/reducer.ts', () => {
  beforeEach(() => {
    state = { ...initialState };
  });

  test('SET_APP_LOADING', () => {
    const loading = false;
    const action: ISetAppLoadingAction = {
      type: ActionTypes.SET_APP_LOADING,
      payload: {
        app: loading,
      },
    };

    expect(reducer(state, action)).toStrictEqual({
      ...state,
      app: loading,
    });
  });

  test('SET_NEWS_LOADING', () => {
    const loading = true;
    const action: ISetNewsLoadingAction = {
      type: ActionTypes.SET_NEWS_LOADING,
      payload: {
        news: loading,
      },
    };

    expect(reducer(state, action)).toStrictEqual({
      ...state,
      news: loading,
    });
  });

  test('SET_POSTS_LOADING', () => {
    const loading = true;
    const action: ISetPostsLoadingAction = {
      type: ActionTypes.SET_POSTS_LOADING,
      payload: {
        posts: loading,
      },
    };

    expect(reducer(state, action)).toStrictEqual({
      ...state,
      posts: loading,
    });
  });
});
