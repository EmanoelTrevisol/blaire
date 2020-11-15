import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Auth from '../utils/firebase/Auth';

const Profile = () => {
  return (
    <View style={stl.container}>
      <Text>Perfil</Text>
      <Button title="logout" onPress={Auth.logout} />
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

export default Profile;
