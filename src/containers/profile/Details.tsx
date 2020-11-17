import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Favorites from './Favorites';
import MyPosts from './MyPosts';

import Auth from '@utils/firebase/Auth';
import Colors from '@assets/colors';

const initialLayout = { width: Dimensions.get('window').width };
const Tab = createMaterialTopTabNavigator();

const Details = () => {
  const username = useSelector((state) => state.auth.user.displayName);

  const confirmLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: logout,
        },
      ],
      { cancelable: true },
    );
  };

  const logout = () => {
    Auth.logout();
  };

  return (
    <>
      <SafeAreaView>
        <View style={stl.profileInfo}>
          <Text style={stl.greetings}>Olá,</Text>
          <Text style={stl.username}>{username}</Text>
          <Text style={stl.instructions}>
            Veja e gerencie abaixo seus posts e favoritos (futuramente)
          </Text>
          <Button
            title="Logout"
            onPress={confirmLogout}
            color={Colors.primary}
          />
        </View>
      </SafeAreaView>
      <NavigationContainer independent={true}>
        <Tab.Navigator initialLayout={initialLayout} initialRouteName="MyPosts">
          <Tab.Screen
            name="MyPosts"
            component={MyPosts}
            options={{ title: 'Meus Posts' }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{ title: 'Favoritos' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const stl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetings: {
    fontSize: 18,
    marginBottom: 2,
  },
  username: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    ...Platform.select({
      android: {
        marginBottom: 10,
      },
    }),
  },
  tabs: {
    flex: 1,
  },
});

export default Details;
