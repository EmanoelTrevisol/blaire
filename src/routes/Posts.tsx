import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import List from '../containers/posts/List';
import Detail from '../containers/posts/Detail';
import NewPost from '../containers/posts/NewPost';
import Edit from '../containers/posts/Edit';

const Stack = createStackNavigator();

const PostRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PostList"
        component={List}
        options={{ title: 'Últimos posts' }}
      />
      <Stack.Screen name="PostDetail" component={Detail} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
};

export default PostRoutes;
