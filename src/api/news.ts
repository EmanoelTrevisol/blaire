import axios from 'axios';
import { apiPaths } from '../config';
import { INewsApiResponse } from '../models/News';

export interface IGetNewsResponse {
  news: INewsApiResponse[];
}

export function getNews(): Promise<IGetNewsResponse> {
  return axios.get(apiPaths.news);
}
