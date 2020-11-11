import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { getPostsList } from '../../store/posts/actions';

const List = (props) => {
  useEffect(() => {
    console.log('INIT');
    props.dispatch(getPostsList());
  }, []);

  if (props.loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <View style={stl.container}>
      <Text>Lista de posts</Text>
    </View>
  );
};

const stl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect((state) => ({
  loading: state.loader.posts,
  list: state.posts.list,
}))(List);
