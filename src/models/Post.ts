import Firestore from '../utils/firebase/Firestore';
import moment from 'moment';
const POST_FIREBASE_COLLECTION = 'posts';

export interface IPostFields {
  id: string;
  title?: string;
  body: string;
  createdAt: number | string | Date;
  updatedAt: number | string | Date;
  username: string;
  userId: string;
}

export class Post implements IPostFields {
  id: string;
  title?: string;
  body: string;
  createdAt: number | string | Date;
  updatedAt: number | string | Date;
  username: string;
  userId: string;

  constructor({
    id,
    title,
    body,
    createdAt,
    updatedAt,
    username,
    userId,
  }: IPostFields) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.username = username;
    this.userId = userId;
    this.createdAt = moment(createdAt).calendar(null, {
      sameElse: 'lll',
    });
    this.updatedAt = moment(updatedAt).calendar(null, {
      sameElse: 'lll',
    });
  }
}

export default class PostStore extends Firestore<typeof Post> {
  constructor() {
    super(POST_FIREBASE_COLLECTION, Post);
  }

  getListByFilter(filter: string) {
    return this.getListWithParams({
      field: 'title',
      operator: '>=',
      value: filter,
    });
  }
}
