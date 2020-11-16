import { INewsApiResponse } from '../models/News';

export function sortNewsByDate(news: INewsApiResponse[]) {
  return news.sort(
    (a, b) =>
      new Date(b.message.created_at).getTime() -
      new Date(a.message.created_at).getTime(),
  );
}
