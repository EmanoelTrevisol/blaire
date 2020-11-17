import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View style={stl.listHeaderStyle}>
      <Image source={require('@/assets/images/grupo-boticario-logo.png')} />
    </View>
  );
};

const stl = StyleSheet.create({
  listHeaderStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});

export default Logo;
