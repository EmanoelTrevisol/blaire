import initialState from '@store/auth/state';

describe('store/auth/state', () => {
  test('matches snapshot', () => {
    expect(initialState).toMatchSnapshot();
  });
});
