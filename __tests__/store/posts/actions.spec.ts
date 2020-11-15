import '@utils/firebase/Firestore';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  setPostsList,
  setDetailPost,
  updatePost,
  deletePost,
  getPostsByFilter,
  getPostsList,
} from '@store/posts/actions';
import { ActionTypes as LoaderActionTypes } from '@store/loader/types';
import { ActionTypes } from '@store/posts/types';
import { Post } from '@models/Post';

let posts: Post[];

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('store/posts/actions.ts', () => {
  beforeEach(() => {
    posts = [
      new Post({
        id: 'aaaaaaaaaaaaa',
        title: 'Esse é um novo post',
        body: 'Legal esse post, né?',
        createdAt: 1605403264,
        updatedAt: 1605403264,
      }),
      new Post({
        id: 'bbbbbbbbbbbbb',
        title: 'Esse é um outro post',
        body: 'Legal esse post também, né?',
        createdAt: 1605303264,
        updatedAt: 1605303264,
      }),
      new Post({
        id: 'ccccccccccccccc',
        title: 'Mais um post',
        body: 'Com certeza esse é legal também!',
        createdAt: 1605303264,
        updatedAt: 1605303264,
      }),
    ];
  });

  test('setPostsList', () => {
    const expectedPayload = {
      type: ActionTypes.SET_POSTS_LIST,
      payload: {
        posts,
      },
    };

    expect(setPostsList(posts)).toStrictEqual(expectedPayload);
  });

  test('getPostsList', async () => {
    const actions = [
      {
        type: LoaderActionTypes.SET_POSTS_LOADING,
        payload: {
          posts: true,
        },
      },
      {
        type: ActionTypes.SET_POSTS_LIST,
        payload: {
          posts: [],
        },
      },
      {
        type: LoaderActionTypes.SET_POSTS_LOADING,
        payload: {
          posts: false,
        },
      },
    ];

    const store = mockStore({ list: [] });

    await store.dispatch(getPostsList());

    expect(store.getActions()).toEqual(actions);
  });

  test('getPostsByFilter', async () => {
    const actions = [
      {
        type: ActionTypes.SET_POSTS_LIST,
        payload: {
          posts: [],
        },
      },
    ];

    const store = mockStore({ list: [] });

    await store.dispatch(getPostsByFilter('search'));

    expect(store.getActions()).toEqual(actions);
  });
});
