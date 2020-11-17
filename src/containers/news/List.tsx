import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  RefreshControl,
  Image,
} from 'react-native';
import { ThunkAction } from 'redux-thunk';
import { treatError } from '../../errors/handler';
import News from '../../models/News';
import NewsCard from '../../components/news/NewsCard';
import { getLatestNews } from '../../store/news/actions';
import Loader from '../../components/Loader';
import Colors from '@assets/colors';
import EmptyState from '@components/EmptyState';
import Logo from '@components/Logo';

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
        return treatError(
          error,
          'Tivemos um problema ao carregar as novidades. Por favor, tente novamente',
        );
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
        <Logo />
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
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            <EmptyState
              title="Ops... nada por aqui"
              subtitle="parece que você não criou nenhum post ainda"
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
