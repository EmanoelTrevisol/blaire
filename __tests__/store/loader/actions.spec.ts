import {
  setAppLoading,
  setNewsLoading,
  setPostsLoading,
} from '@store/loader/actions';
import { ActionTypes } from '@store/loader/types';

describe('store/loader/actions.ts', () => {
  test('setAppLoading', () => {
    const loading = false;
    const expectePpayload = {
      type: ActionTypes.SET_APP_LOADING,
      payload: {
        app: loading,
      },
    };

    expect(setAppLoading(loading)).toStrictEqual(expectePpayload);
  });

  test('setNewsLoading', () => {
    const loading = true;
    const expectePpayload = {
      type: ActionTypes.SET_NEWS_LOADING,
      payload: {
        news: loading,
      },
    };

    expect(setNewsLoading(loading)).toStrictEqual(expectePpayload);
  });

  test('setPostsLoading', () => {
    const loading = true;
    const expectePpayload = {
      type: ActionTypes.SET_POSTS_LOADING,
      payload: {
        posts: loading,
      },
    };

    expect(setPostsLoading(loading)).toStrictEqual(expectePpayload);
  });
});
