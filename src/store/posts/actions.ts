import { ActionTypes } from './types';
import { setPostsLoading } from '../loader/actions';

import PostStore, { Post } from '../../models/Post';

const postsStore = new PostStore();

export function setPostsList(posts: Post[]) {
  return {
    type: ActionTypes.SET_POSTS_LIST,
    payload: {
      posts,
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

export function createPost({ title, body }: { title: string; body: string }) {
  return async (dispatch, getState) => {
    try {
      const { displayName, uid } = getState().auth.user;

      // username would not be saved here.
      // It is here because firestore does not provide join/populate
      await postsStore.createNewDoc({
        title,
        body,
        username: displayName,
        userId: uid,
      });

      dispatch(getPostsList());
    } catch (error) {
      console.log('Error creating post on action', error);
    }
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
