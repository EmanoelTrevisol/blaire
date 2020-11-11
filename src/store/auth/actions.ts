import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActionTypes } from './types';

export function setUserInfo(user: FirebaseAuthTypes.User | null) {
  return {
    type: ActionTypes.SET_USER_INFO,
    payload: { user },
  };
}
