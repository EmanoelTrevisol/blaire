import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Favorites = () => {
  return (
    <View style={stl.centered}>
      <Icon style={stl.icon} name={'wrench'} />
      <Text style={stl.title}>Em construção</Text>
      <View>
        <Text style={stl.subtitle}>
          Estamos trabalhando nessa feature no momento. Logo ela será liberada e
          você vai conseguir acessar de forma fácil aqueles posts importantes
        </Text>
      </View>
      <Icon style={stl.smileyFace} name={'smile-beam'} />
    </View>
  );
};

const stl = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  icon: {
    fontSize: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 70,
  },
  smileyFace: {
    fontSize: 40,
  },
});

export default Favorites;
