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

export function setUserPostsList(posts: Post[]) {
  return {
    type: ActionTypes.SET_USER_POSTS_LIST,
    payload: {
      posts,
    },
  };
}

export function updatePostInList(postId: string, post: Post) {
  return {
    type: ActionTypes.UPDATE_POST,
    payload: {
      postId,
      post,
    },
  };
}

export function deletePostFromLists(postId: string) {
  return {
    type: ActionTypes.DELETE_POST,
    payload: {
      postId,
    },
  };
}

export function deletePost(postId: string) {
  return async (dispatch) => {
    try {
      await postsStore.deleteDocById(postId);

      dispatch(deletePostFromLists(postId));
    } catch (error) {
      console.log('Error deleting', error);
    }
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
      dispatch(getUserPosts());
    } catch (error) {
      console.log('Error creating post on action', error);
    }
  };
}

export function updatePost(postId: string, post: Partial<Post>) {
  return async (dispatch) => {
    try {
      const newPost = await postsStore.updateDocById(postId, post);

      dispatch(updatePostInList(postId, newPost));
    } catch (error) {
      console.log('Error updating post', postId, error);
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

export function getUserPosts() {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.user.uid;

      const posts = await postsStore.getDocsByUserId(userId);

      dispatch(setUserPostsList(posts));
    } catch (error) {
      console.log('Error getting user posts', error);
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
