import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { debounce } from 'lodash';
import { ThunkAction } from 'redux-thunk';

import { Post } from '@models/Post';
import PostListTop from '@components/posts/PostListTop';
import Postlist from '@components/posts/PostList';
import { getPostsList, getPostsByFilter } from '@store/posts/actions';
import Loader from '@components/Loader';

export interface IProps {
  list: Post[];
  dispatch: ThunkAction;
  loading: boolean;
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
    setSearchText(search);
    searchPosts(search);
  };

  const searchPosts = debounce((search) => {
    dispatch(getPostsByFilter(search));
  }, 500);

  useEffect(() => {
    loadPosts(false);
  }, [loadPosts]);

  if (loading && !isRefreshing) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <PostListTop onSearchChange={onSearchChange} searchText={searchText} />
      <Postlist
        refreshing={isRefreshing}
        onRefresh={() => loadPosts(true)}
        data={list}
      />
    </SafeAreaView>
  );
};

export default connect((state) => ({
  loading: state.loader.posts,
  list: state.posts.list,
}))(List);
