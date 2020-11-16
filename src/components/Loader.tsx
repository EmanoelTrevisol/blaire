import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export enum Sizes {
  LARGE = 'large',
  SMALL = 'small',
}

export interface IProps {
  size?: Sizes;
  color?: string;
}

const Loader = ({ size = Sizes.LARGE, color = '#000' }: IProps) => {
  return (
    <View style={stl.container}>
      <ActivityIndicator size={size} color={color} />
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

export default Loader;
