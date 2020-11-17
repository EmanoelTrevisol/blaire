import { Post } from '../../models/Post';

export enum ActionTypes {
  SET_POSTS_LIST = 'SET_POSTS_LIST',
  SET_USER_POSTS_LIST = 'SET_USER_POSTS_LIST',
  UPDATE_POST = 'UPDATE_POST',
  DELETE_POST = 'DELETE_POST',
}

export interface ISetPostsList {
  type: ActionTypes.SET_POSTS_LIST;
  payload: {
    // TODO: Add type for posts
    posts: Post[];
  };
}

export interface ISetUserPostsList {
  type: ActionTypes.SET_USER_POSTS_LIST;
  payload: {
    posts: Post[];
  };
}

export interface IUpdatePost {
  type: ActionTypes.UPDATE_POST;
  payload: {
    postId: string;
    post: Post;
  };
}

export interface IDeletePost {
  type: ActionTypes.DELETE_POST;
  payload: {
    postId: string;
  };
}

export type PostActionTypes =
  | ISetPostsList
  | ISetUserPostsList
  | IUpdatePost
  | IDeletePost;
