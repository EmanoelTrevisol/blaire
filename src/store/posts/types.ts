export enum ActionTypes {
  SET_POSTS_LIST = 'SET_POSTS_LIST',
  SET_POST_DETAIL = 'SET_POST_DETAIL',
  UPDATE_POST = 'UPDATE_POST',
  DELETE_POST = 'DELETE_POST',
}

export interface ISetPostsList {
  type: ActionTypes.SET_POSTS_LIST;
  payload: {
    // TODO: Add type for posts
    posts: any[];
  };
}

export interface ISetPostDetail {
  type: ActionTypes.SET_POST_DETAIL;
  payload: {
    // TODO: Add type for post
    post: any;
  };
}

export interface IUpdatePost {
  type: ActionTypes.UPDATE_POST;
  payload: {
    // TODO: Add type for post
    post: any;
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
  | ISetPostDetail
  | IUpdatePost
  | IDeletePost;
