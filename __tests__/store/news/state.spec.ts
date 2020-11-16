import initialState from '@store/news/state';

describe('store/news/state.ts', () => {
  test('matches snapshot', () => {
    expect(initialState).toMatchSnapshot();
  });
});
