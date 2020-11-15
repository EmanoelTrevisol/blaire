import React from 'react';
import PostList from '@components/posts/PostList';
import PostCard from '@/components/posts/PostCard';
import { render } from '@testing-library/react-native';
import { FlatList } from 'react-native';

let props;

describe('PostLists.tsx', () => {
  const renderComp = (cpProps) => {
    return render(<PostList {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      posts: [
        {
          title: 'Título de exemplo',
          body: 'Esse é o post. É pequeno pq é só um exemplo',
          id: 'asdasdadadadsadasdasd',
          imageUrl: undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        {
          title: 'Mais um título de exemplo',
          body: 'Esse é outro post. É pequeno também pq é só um exemplo',
          id: 'asdasdadadadsadasdasd',
          imageUrl: undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
    };
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });

  test('renders FlatList', () => {
    const { UNSAFE_getAllByType } = renderComp(props);
    const flatList = UNSAFE_getAllByType(FlatList);

    expect(flatList).toBeDefined();
    expect(flatList.length).toBe(1);
  });

  test('FlatList renders PostCard', () => {
    const { UNSAFE_getByType } = renderComp(props);

    const flatList = UNSAFE_getByType(FlatList);

    const renderedDetail = flatList.props.renderItem({ item: props.posts[0] });

    expect(renderedDetail).toBeDefined();
    expect(renderedDetail.type).toBe(PostCard);
    expect(renderedDetail.props).toMatchObject(props.posts[0]);
  });
});
