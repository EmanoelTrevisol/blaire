import React from 'react';
import PostCard from '@/components/posts/PostCard';
import { render } from '@testing-library/react-native';

let props;

describe('PostCard.tsx', () => {
  const renderComp = (cpProps) => {
    return render(<PostCard {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      title: 'Título de exemplo',
      body: 'Esse é o post. É pequeno pq é só um exemplo',
      id: 'asdasdadadadsadasdasd',
      createdAt: 1605399247782,
      updatedAt: 1605399247782,
    };
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });
});
