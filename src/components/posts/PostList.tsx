import React from 'react';
import { FlatList } from 'react-native';
import PostCard from './PostCard';
import { Post } from '../../models/Post';

interface IProps {
  refreshing: boolean;
  onRefresh: () => {};
  data: Post[];
}

const PostsList = (props: IProps) => {
  const renderItem = ({ item }: { item: Post }) => {
    return <PostCard {...item} />;
  };

  return (
    <FlatList
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      data={props.data}
      keyExtractor={(itm) => itm.id}
      renderItem={renderItem}
    />
  );
};

export default PostsList;
