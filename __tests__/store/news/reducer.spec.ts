import initialState from '@store/news/state';
import reducer from '@store/news/reducer';
import { ActionTypes, ISetNewsListActions } from '@store/news/types';
import { news } from '@models/fakeData/news';
let state: typeof initialState;

describe('store/news/reducer.ts', () => {
  beforeEach(() => {
    state = { ...initialState };
  });

  test('action SET_NEWS_LIST', () => {
    const newList = [...news, ...news, ...news];

    const action: ISetNewsListActions = {
      type: ActionTypes.SET_NEWS_LIST,
      payload: {
        news: newList,
      },
    };

    expect(reducer(state, action).list).toEqual(newList);
  });
});
