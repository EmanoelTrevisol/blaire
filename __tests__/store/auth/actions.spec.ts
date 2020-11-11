import { setUserInfo } from '@store/auth/actions';
import { ActionTypes } from '@store/auth/types';

describe('Auth actions', () => {
  test('setUserInfo', () => {
    const user = {
      uid: 'asdfkjshdgfakjshdfgkasjhdfgkajhsdfgkajshdgkjh',
      email: 'teste@teste.com',
    };

    const obj = {
      type: ActionTypes.SET_USER_INFO,
      payload: {
        user,
      },
    };

    expect(setUserInfo(user)).toStrictEqual(obj);
  });
});
