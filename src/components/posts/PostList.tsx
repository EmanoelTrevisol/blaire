import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
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
      data={props.data}
      keyExtractor={(itm) => itm.id}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
          tintColor="#000"
        />
      }
    />
  );
};

export default PostsList;
