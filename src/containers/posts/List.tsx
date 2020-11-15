import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, SafeAreaView } from 'react-native';
import { debounce } from 'lodash';
import { ThunkAction } from 'redux-thunk';

import { Post } from '../../models/Post';
import PostListTop from '../../components/posts/PostListTop';
import Postlist from '../../components/posts/PostList';
import { getPostsList, getPostsByFilter } from '../../store/posts/actions';

export interface IProps {
  list: Post[];
  dispatch: ThunkAction;
  loading: boolean;
  getPostsByFilter: typeof getPostsByFilter;
  getPostsList: typeof getPostsList;
}

const List = (props: IProps) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const { list, dispatch, loading } = props;

  const loadPosts = useCallback(
    async (isRefresh: boolean = false) => {
      try {
        if (isRefresh) {
          setIsRefreshing(true);
        }
        await (searchText
          ? dispatch(getPostsByFilter(searchText))
          : dispatch(getPostsList()));
      } catch (error) {
        console.log('ERROR on refresh', error);
      } finally {
        if (isRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [dispatch, searchText],
  );

  const onSearchChange = (search: string) => {
    console.log('search text change: ', search);
    setSearchText(search);
    searchPosts(search);
  };

  const searchPosts = debounce((search) => {
    dispatch(getPostsByFilter(search));
  }, 500);

  const onAddClick = () => {
    // TODO: create post create/edit modal
    console.log('To open modal');
  };

  useEffect(() => {
    loadPosts(false);
  }, [loadPosts]);

  if (loading && !isRefreshing) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <SafeAreaView>
      <PostListTop
        onSearchChange={onSearchChange}
        onAddClick={onAddClick}
        searchText={searchText}
      />
      <View>
        <Postlist
          refreshing={isRefreshing}
          onRefresh={() => loadPosts(true)}
          data={list}
        />
      </View>
    </SafeAreaView>
  );
};

export default connect((state) => ({
  loading: state.loader.posts,
  list: state.posts.list,
}))(List);
