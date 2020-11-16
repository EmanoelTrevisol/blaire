import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export interface IFormErrorProps {
  messages: {
    required: string;
    valid?: string;
    minLength?: string;
    maxLength?: string;
  };
  error: boolean;
  errors: {
    required: boolean;
    valid?: boolean;
    minLength?: boolean;
    maxLength?: boolean;
  };
  dirty: boolean;
}

const FormErrors = (props: IFormErrorProps) => {
  const { error, dirty, messages, errors } = props;

  if (!error || !dirty) {
    return null;
  }

  const errorMessage = () => {
    let comp: JSX.Element | null = null;

    for (const [key, value] of Object.entries(errors)) {
      if (value) {
        comp = (
          <Text style={stl.inputErrorText} testID={`${key}-error`}>
            {messages[key]}
          </Text>
        );

        break;
      }
    }

    return comp;
  };

  return <View style={stl.errors}>{errorMessage()}</View>;
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
