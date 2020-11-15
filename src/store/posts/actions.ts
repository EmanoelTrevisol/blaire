import { ActionTypes } from './types';
import { setPostsLoading } from '../loader/actions';

import PostStore, { Post } from '../../models/Post';

const postsStore = new PostStore();

// TODO: add posts type
export function setPostsList(posts: Post[]) {
  return {
    type: ActionTypes.SET_POSTS_LIST,
    payload: {
      posts,
    },
  };
}

export function setDetailPost(postId: string) {
  // TODO: add post type and post itself
  return {
    type: ActionTypes.SET_POST_DETAIL,
    payload: {
      post: null,
    },
  };
}

export function updatePost(postId: string, newData: Partial<Post>) {
  return {
    type: ActionTypes.UPDATE_POST,
    payload: {
      // TODO: fix logix
      post: { ...newData },
    },
  };
}

export function deletePost(postId: string) {
  return {
    type: ActionTypes.DELETE_POST,
    payload: {
      postId,
    },
  };
}

export function getPostsByFilter(filter: string) {
  return async (dispatch) => {
    try {
      const posts = await postsStore.getListByFilter(filter);

      dispatch(setPostsList(posts));
    } catch (error) {
      console.log('Error getting post list by filter', error);
    }
  };
}

export function getPostsList() {
  return async (dispatch) => {
    try {
      dispatch(setPostsLoading(true));

      const posts = await postsStore.getList();
      // TODO: Fix posts type problem
      dispatch(setPostsList(posts));
    } catch (error) {
      console.log('Error getting post list', error);
      throw error;
    } finally {
      dispatch(setPostsLoading(false));
    }
  };
}
