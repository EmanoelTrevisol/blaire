import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export interface IProps {
  title?: string;
  subtitle?: string;
}

const EmptyState = (props: IProps) => {
  const title = props.title || 'Ops... não tem nada por aqui';
  const subtitle = props.subtitle || 'Infelizmente não encontramos nada';

  return (
    <View style={stl.center}>
      <Icon style={stl.icon} name={'frown'} />
      <Text style={stl.title}>{title}</Text>
      <Text style={stl.subtitle}>{subtitle}</Text>
    </View>
  );
};

const stl = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default EmptyState;
