import { ActionTypes } from './types';
import { setPostsLoading } from '../loader/actions';
import Firestore from '../../utils/firebase/Firestore';

const PostsStore = new Firestore('posts');

// TODO: add posts type
export function setPostsList(posts: any[]) {
  console.log('ON NORMAL SET ACTION');
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

export function updatePost(postId: string, newData: any) {
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

export function getPostsList() {
  return async (dispatch) => {
    try {
      console.log('GETTING POST LIST');
      dispatch(setPostsLoading(true));

      const posts = await PostsStore.getList();
      console.log('ON ASYNC ACTION');
      dispatch(setPostsList(posts));
    } catch (error) {
      console.log('Error getting post list', error);
      throw error;
    } finally {
      dispatch(setPostsLoading(false));
    }
  };
}
