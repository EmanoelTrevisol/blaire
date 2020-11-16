import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'jest-mock-axios';

import { ActionTypes } from '@store/news/types';
import { ActionTypes as LoaderActionTypes } from '@store/loader/types';
import { getLatestNews, setNewsList } from '@store/news/actions';
import { apiResponse, news } from '@models/fakeData/news';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('store/news/actions.ts', () => {
  test('setNewsList', () => {
    const list = [...news, ...news];
    const expectedAction = {
      type: ActionTypes.SET_NEWS_LIST,
      payload: {
        news: list,
      },
    };

    expect(setNewsList(list)).toStrictEqual(expectedAction);
  });

  test('getLatestNews', async () => {
    mockAxios.get.mockReturnValueOnce(apiResponse);
    const store = mockStore({ list: [] });

    const expectedActions = [
      {
        type: LoaderActionTypes.SET_NEWS_LOADING,
        payload: {
          news: true,
        },
      },
      {
        type: ActionTypes.SET_NEWS_LIST,
        payload: {
          news,
        },
      },
      {
        type: LoaderActionTypes.SET_NEWS_LOADING,
        payload: {
          news: false,
        },
      },
    ];

    await store.dispatch(getLatestNews());

    expect(mockAxios.get).toHaveBeenCalled();
    expect(store.getActions()).toEqual(expectedActions);
  });
});
