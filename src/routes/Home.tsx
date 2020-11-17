import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostList from '../containers/posts/List';
import Profile from './Profile';
import News from '../containers/news/List';
import Colors from '@assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

class HomeRoutes extends React.Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Posts"
        tabBarOptions={{
          activeTintColor: Colors.accentColor,
          inactiveTintColor: Colors.primary,
        }}
      >
        <Tab.Screen
          name="News"
          component={News}
          options={{
            title: 'Novidades',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'newspaper'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Posts"
          component={PostList}
          options={{
            title: 'Posts',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'blog'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <Icon name={'user'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default HomeRoutes;
