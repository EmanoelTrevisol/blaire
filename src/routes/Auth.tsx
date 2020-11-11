import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../containers/auth/SignIn';
import SignUp from '../containers/auth/SignUp';

const Stack = createStackNavigator();

class AuthRoutes extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: 'Bem vindo ao Blaire', headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Bem vindo ao Blair', headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default AuthRoutes;
