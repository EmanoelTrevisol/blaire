import { INews } from '../../models/News';

export enum ActionTypes {
  GET_NEWS = 'GET_NEWS',
  SET_NEWS_LIST = 'SET_NEWS_LIST',
}

export interface IGetNewsActions {
  type: ActionTypes.GET_NEWS;
}

export interface ISetNewsListActions {
  type: ActionTypes.SET_NEWS_LIST;
  payload: {
    news: INews[];
  };
}

export type NewsActionTypes = IGetNewsActions | ISetNewsListActions;
