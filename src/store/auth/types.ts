import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum ActionTypes {
  SET_USER_INFO = 'SET_USER_INFO',
  CLEAR_USER_INFO = 'CLEAR_USER_INFO',
}

export interface ISetUserAction {
  type: ActionTypes.SET_USER_INFO;
  payload: {
    user: FirebaseAuthTypes.User | null;
  };
}

export interface IClearUserInfo {
  type: ActionTypes.CLEAR_USER_INFO;
  payload?: {};
}

export type AuthActionTypes = ISetUserAction | IClearUserInfo;
