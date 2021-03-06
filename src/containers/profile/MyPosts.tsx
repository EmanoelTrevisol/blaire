import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import PostList from '@components/posts/PostList';
import { getUserPosts, deletePost } from '@store/posts/actions';
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '@/components/EmptyState';
import { treatError } from '../../errors/handler';

const MyPosts = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.posts.userPosts);

  const getPosts = async () => {
    try {
      setRefreshing(true);
      await dispatch(getUserPosts());
    } catch (error) {
      return treatError(
        error,
        'Houve um problema ao pegar as informações. Por favor, tente novamente',
      );
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const doDelete = (postId: string) => {
    dispatch(deletePost(postId));
  };

  const confirmDelete = (postId: string) => {
    Alert.alert(
      'Apagar?',
      'Tem certeza que quer apagar esse post? Essa ação não tem volta',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {},
        },
        { text: 'Apagar!', onPress: () => doDelete(postId) },
      ],
    );
  };

  const onRefresh = () => getPosts();

  return (
    <View style={stl.view}>
      <PostList
        data={userPosts}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showEditIcon={true}
        confirmDelete={confirmDelete}
        listEmptyStateComp={
          <EmptyState
            title="Ops... nada por aqui"
            subtitle="parece que você não criou nenhum post ainda"
          />
        }
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
