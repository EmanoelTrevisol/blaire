export enum ActionTypes {
  SET_APP_LOADING = 'SET_APP_LOADING',
  SET_NEWS_LOADING = 'SET_NEWS_LOADING',
  SET_POSTS_LOADING = 'SET_POSTS_LOADING',
}

export interface ISetAppLoadingAction {
  type: ActionTypes.SET_APP_LOADING;
  payload: {
    app: boolean;
  };
}

export interface ISetNewsLoadingAction {
  type: ActionTypes.SET_NEWS_LOADING;
  payload: {
    news: boolean;
  };
}

export interface ISetPostsLoadingAction {
  type: ActionTypes.SET_POSTS_LOADING;
  payload: {
    posts: boolean;
  };
}

export type LoaderActionTypes =
  | ISetAppLoadingAction
  | ISetNewsLoadingAction
  | ISetPostsLoadingAction;
