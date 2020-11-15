import Firestore from '../utils/firebase/Firestore';
import moment from 'moment';
const POST_FIREBASE_COLLECTION = 'posts';

export interface IPostFields {
  id: string;
  title?: string;
  body: string;
  createdAt: number | string | Date;
  updatedAt: number | string | Date;
  // username: string;
}

export class Post implements IPostFields {
  id: string;
  title?: string;
  body: string;
  createdAt: number | string | Date;
  updatedAt: number | string | Date;
  username: string;

  constructor({
    id,
    title,
    body,
    createdAt,
    updatedAt,
  }: // username,
  IPostFields) {
    this.id = id;
    this.title = title;
    this.body = body;
    // this.username = username;
    this.createdAt = moment(createdAt).format('lll');
    this.updatedAt = moment(updatedAt).format('lll');
    // Placeholder while username is not saved in firebase
    this.username =
      Math.floor(Math.random() * 10) % 2 === 0
        ? 'Emanoel Trevisol'
        : 'Emanoel Trevisol Frederico';
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
