import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from '@components/posts/PostList';
import { getUserPosts } from '@store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';

const MyPosts = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.posts.userPosts);

  const getPosts = async () => {
    try {
      setRefreshing(true);
      await dispatch(getUserPosts());
    } catch (error) {
      console.log('error', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onRefresh = () => getPosts();

  return (
    <View style={stl.view}>
      <PostList
        data={userPosts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showEditIcon={true}
      />
    </View>
  );
};

const stl = StyleSheet.create({
  view: {
    marginVertical: 10,
  },
});

export default MyPosts;
