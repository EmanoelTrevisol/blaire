import React from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

export interface IProps {
  buttonStyle?: any;
  loaderColor?: string;
  isSubmitting: boolean;
  onSubmit: () => Promise<void>;
  children: JSX.Element;
}

const LoaderButton = (props: IProps) => {
  const { isSubmitting, buttonStyle, onSubmit, children, loaderColor } = props;

  return (
    <TouchableOpacity
      style={[stl.button, buttonStyle]}
      disabled={isSubmitting}
      onPress={onSubmit}
    >
      {(isSubmitting && <ActivityIndicator color={loaderColor || '#000'} />) ||
        children}
    </TouchableOpacity>
  );
};

const stl = StyleSheet.create({
  button: {},
});

export default LoaderButton;
