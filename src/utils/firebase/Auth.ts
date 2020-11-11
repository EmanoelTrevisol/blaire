import auth from '@react-native-firebase/auth';
import { setAppLoading } from '../../store/loader/actions';
import { setUserInfo } from '../../store/auth/actions';

export default class Auth {
  protected dispatch: Function;

  static signUp(email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

  static signIn(email: string, password: string) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  static logout() {
    return auth().signOut();
  }

  constructor(dispatch: Function) {
    this.dispatch = dispatch;
  }

  init() {
    this.dispatch(setAppLoading(true));
    this.setOnStateChange();
  }

  get auth() {
    return auth();
  }

  get user() {
    return this.auth.currentUser;
  }

  public setOnStateChange() {
    this.auth.onAuthStateChanged((user) => {
      this.dispatch(setAppLoading(false));
      this.dispatch(setUserInfo(user));
    });
  }
}
