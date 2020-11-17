import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Auth from '../utils/firebase/Auth';

const Profile = () => {
  const username = useSelector((state) => state.auth.user.displayName);

  const updateUsername = async () => {
    try {
      const updated = await Auth.getCurrentUser()?.updateProfile({
        displayName: 'João da Silva',
      });
      console.log('UPDATED', updated);
    } catch (error) {
      console.log('ERROR UPDATING', error);
    } finally {
      console.log('CURRENT USER', Auth.getCurrentUser());
    }
  };

  return (
    <View style={stl.container}>
      <Text>Perfil</Text>
      <Text>{username}</Text>
      <Button title="Mudar nome" onPress={() => updateUsername()} />
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
