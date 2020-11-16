import React from 'react';
import CreateEditModal, { IProps } from '@/components/posts/CreateEditModal';
import { render } from '@testing-library/react-native';

let props: IProps;

describe('PostCard.tsx', () => {
  const renderComp = (cpProps: IProps) => {
    return render(<CreateEditModal {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      title: 'Novo post',
      buttonTitle: 'Criar',
      post: null,
      onSubmit: jest.fn(),
      close: jest.fn(),
      visible: true,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });
});
