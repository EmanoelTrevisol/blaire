import { ActionTypes } from './types';
import { getNews } from '../../api/news';
import { setNewsLoading } from '../loader/actions';
import News, { INews } from '../../models/News';
import { sortNewsByDate } from '../../utils/sort';
import { treatError } from '../../errors/handler';

export function getLatestNews() {
  return async (dispatch) => {
    try {
      dispatch(setNewsLoading(true));

      const res = await getNews();

      const news = sortNewsByDate(res.news).map((n) => new News({ ...n }));

      dispatch(setNewsList(news));
    } catch (error) {
      return treatError(
        error,
        'Ops... tivemos um problema ao pegar as últimas novidades',
      );
    } finally {
      dispatch(setNewsLoading(false));
    }
  };
}

export function setNewsList(list: INews[]) {
  return {
    type: ActionTypes.SET_NEWS_LIST,
    payload: {
      news: list,
    },
  };
}
