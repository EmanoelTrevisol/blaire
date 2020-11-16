import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  RefreshControl,
} from 'react-native';
import { ThunkAction } from 'redux-thunk';

import News from '../../models/News';
import NewsCard from '../../components/news/NewsCard';
import { getLatestNews } from '../../store/news/actions';
import Loader from '../../components/Loader';

export interface IProps {
  list: News[];
  dispatch: ThunkAction;
  loading: boolean;
}

const List = (props: IProps) => {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const { list, dispatch, loading } = props;

  const loadLatestNews = useCallback(
    async (isRefresh: boolean = false) => {
      try {
        if (isRefresh) {
          setIsRefreshing(true);
        }
        await dispatch(getLatestNews());
      } catch (error) {
        console.log('ERROR on refresh', error);
      } finally {
        if (isRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [dispatch],
  );

  useEffect(() => {
    loadLatestNews(false);
  }, [loadLatestNews]);

  if (loading && !isRefreshing) {
    return <Loader />;
  }

  return (
    <SafeAreaView>
      <View style={stl.container}>
        <FlatList
          data={list}
          refreshing={isRefreshing}
          onRefresh={() => loadLatestNews(true)}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <NewsCard {...item} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadLatestNews(true)}
              tintColor="#000"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const stl = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        marginTop: 15,
      },
    }),
  },
});

export default connect((state) => ({
  loading: state.loader.news,
  list: state.news.list,
}))(List);
