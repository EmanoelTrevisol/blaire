import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface IFormErrorProps {
  messages: {
    required: string;
    valid: string;
  };
  error: boolean;
  errors: {
    valid: boolean;
    required: boolean;
  };
  dirty: boolean;
}

const FormErrors = (props: IFormErrorProps) => {
  const {
    error,
    dirty,
    messages,
    errors: { required, valid },
  } = props;
  if (!error || !dirty) {
    return null;
  }

  return (
    <View style={stl.errors}>
      {(required && (
        <Text style={stl.inputErrorText} testID="required-error">
          {messages.required}
        </Text>
      )) ||
        null}
      {(valid && (
        <Text style={stl.inputErrorText} testID="valid-error">
          {messages.valid}
        </Text>
      )) ||
        null}
    </View>
  );
};

const stl = StyleSheet.create({
  errors: {
    marginVertical: 10,
  },
  inputErrorText: {
    color: '#dd0000',
    fontSize: 12,
  },
});

export default FormErrors;
