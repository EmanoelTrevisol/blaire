import React from 'react';
import PostListTop, { IProps } from '@components/posts/PostListTop';
import CreateEditModal from '@components/posts/CreateEditModal';
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

  test('passes visible to modal on icon click', async () => {
    const { UNSAFE_getAllByType, UNSAFE_getByType } = renderComp(props);

    const addPostButton = UNSAFE_getAllByType(TouchableOpacity);
    const modal = UNSAFE_getByType(CreateEditModal);
    const visibleOnInit = modal.props.visible;

    await waitFor(() => fireEvent.press(addPostButton[0]));

    const visibleModal = UNSAFE_getByType(CreateEditModal);

    expect(visibleOnInit).toBe(false);
    expect(visibleModal.props.visible).toBe(true);
  });
});
