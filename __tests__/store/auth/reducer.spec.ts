import { ActionTypes } from '@store/auth/types';
import reducer from '@store/auth/reducer';
import initialState from '@store/auth/state';

let state: typeof initialState;

describe('auth reducer', () => {
  beforeEach(() => {
    state = { ...initialState };
  });

  test('Action SET_USER_INFO', () => {
    const user = {
      email: 'email@email.com',
      uid: 'asdkjasdkjashdka',
    };
    const action = {
      type: ActionTypes.SET_USER_INFO,
      payload: {
        user,
      },
    };

    expect(reducer(state, action)).toStrictEqual({ ...state, user });
  });

  test('action CLEAR_USER_INFO', () => {
    const action = {
      type: ActionTypes.CLEAR_USER_INFO,
    };

    expect(reducer(state, action)).toStrictEqual(initialState);
  });
});
