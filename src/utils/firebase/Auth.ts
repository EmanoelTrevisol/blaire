import auth from '@react-native-firebase/auth';
import { setAppLoading } from '../../store/loader/actions';
import { setUserInfo } from '../../store/auth/actions';
import { treatError } from '../../errors/handler';

export default class Auth {
  protected dispatch: Function;

  static async signUp({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);

      const currentUser = Auth.getCurrentUser();

      await currentUser?.updateProfile({ displayName: username });

      return Auth.getCurrentUser();
    } catch (error) {
      return treatError(error);
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const credencials = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      return credencials;
    } catch (error) {
      return treatError(error);
    }
  }

  static logout() {
    return auth().signOut();
  }

  static getCurrentUser() {
    return auth().currentUser;
  }

  constructor(dispatch: Function) {
    this.dispatch = dispatch;
  }

  init() {
    this.dispatch(setAppLoading(true));
    this.setOnStateChanged();
    this.setOnUserChanged();
  }

  get auth() {
    return auth();
  }

  get user() {
    return this.auth.currentUser;
  }

  public setOnStateChanged() {
    this.auth.onAuthStateChanged((user) => {
      this.dispatch(setAppLoading(false));
      this.dispatch(setUserInfo(user));
    });
  }

  public setOnUserChanged() {
    this.auth.onUserChanged((user) => {
      this.dispatch(setUserInfo(user));
    });
  }
}
