import React from 'react';
import PostListTop, { IProps } from '@components/posts/PostListTop';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';

let props: IProps;

describe('PostListTop.tsx', () => {
  const renderComp = (cpProps: IProps) => {
    return render(<PostListTop {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      searchText: '',
      onSearchChange: jest.fn(),
      onAddClick: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });

  test('calls onSearchChange', async () => {
    const search = 'Coffee';
    const { getByPlaceholderText } = renderComp(props);

    const textInput = getByPlaceholderText('Pesquise um post');

    await waitFor(() => fireEvent.changeText(textInput, search));

    expect(props.onSearchChange).toHaveBeenCalledWith(search);
  });

  test('render with searchText prop on input', async () => {
    const searchText = 'Coffee';
    props.searchText = searchText;
    const { getByPlaceholderText } = renderComp(props);

    const textInput = getByPlaceholderText('Pesquise um post');

    expect(textInput.props.value).toBe(searchText);
  });

  test('calls onAddClick when icon is clicked', async () => {
    const { UNSAFE_getAllByType } = renderComp(props);

    const addPostButton = UNSAFE_getAllByType(TouchableOpacity);

    await waitFor(() => fireEvent.press(addPostButton[0]));

    expect(addPostButton.length).toBe(1);
    expect(props.onAddClick).toHaveBeenCalledTimes(1);
  });
});
