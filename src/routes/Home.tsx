import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsStack from './Posts';
import Profile from './Profile';
import News from '../containers/News';
const Tab = createBottomTabNavigator();

class HomeRoutes extends React.Component {
  render() {
    return (
      <Tab.Navigator initialRouteName="Posts">
        <Tab.Screen name="News" component={News} />
        <Tab.Screen name="Posts" component={PostsStack} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

export default HomeRoutes;
