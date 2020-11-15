import initialState from '@store/loader/state';

describe('store/loader/state', () => {
  test('matches snapshot', () => {
    expect(initialState).toMatchSnapshot();
  });
});
