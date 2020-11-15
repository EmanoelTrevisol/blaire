import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostList from '../containers/posts/List';
import Profile from './Profile';
import News from '../containers/News';
const Tab = createBottomTabNavigator();

class HomeRoutes extends React.Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Posts">
        <Tab.Screen
          name="News"
          component={News}
          options={{ title: 'Novidades' }}
        />
        <Tab.Screen
          name="Posts"
          component={PostList}
          options={{ title: 'Últimos posts' }}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

export default HomeRoutes;
