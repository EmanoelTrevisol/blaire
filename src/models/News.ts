import moment from 'moment';

export interface INewsUser {
  name: string;
  profile_picture: string;
}

export interface INewsMessage {
  content: string;
  created_at: string;
}

export interface INewsApiResponse {
  user: INewsUser;
  message: INewsMessage;
}

export interface INews {
  message: string;
  createdAt: string;
  username: string;
  profilePicture: string;
  key: string;
}

export default class News implements INews {
  message: string;
  username: string;
  profilePicture: string;
  createdAt: string;
  key: string;

  constructor({ user, message }: INewsApiResponse) {
    this.message = message.content;
    this.createdAt = moment(message.created_at).format('lll');
    this.key = message.created_at;
    this.username = user.name;
    this.profilePicture =
      'https://pbs.twimg.com/profile_images/1323222831065374722/dldoUekJ_400x400.jpg';

    // this.profilePicture = user.profile_picture;
    // the profile_picture in the response does not exist anymore so I changed it to have a real image
  }
}
