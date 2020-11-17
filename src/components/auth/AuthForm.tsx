import React, { useState, useReducer, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { FormActionTypes, ActionTypes } from '@store/form/types';
import { formReducer } from '@store/form/reducer';
import initialFormState from '@store/form/state';

import FormErrors from '../form/FormErrors';

import { isValid } from '@validations/email';
import { matchesPattern } from '@validations/string';

const usernameErrorMessages = {
  required: 'Por favor, informe seu nome',
  valid: 'Ops... continue digitando. Estamos quase lá',
};

const emailErrorMessages = {
  required: 'Por favor, informe seu email',
  valid: 'Ops... esse email não parece ser válido',
};

const passwordErrorMessages = {
  required: 'Por favor, informe uma senha',
  valid: 'Quase lá! Falta pouco para cumprir os requisitos da senha',
};

function validateField({
  dispatcher,
  value,
  validateFn,
}: {
  dispatcher: React.Dispatch<FormActionTypes>;
  value: string;
  validateFn: Function;
}) {
  dispatcher({
    type: ActionTypes.SET_DIRTY,
    payload: {
      dirty: true,
    },
  });

  let error = false;
  const errors = {
    valid: false,
    required: false,
  };

  if (!value) {
    error = true;
    errors.required = true;
    errors.valid = false;
  } else if (!validateFn(value)) {
    error = true;
    errors.required = false;
    errors.valid = true;
  } else {
    error = false;
    errors.required = false;
    errors.valid = false;
  }

  dispatcher({
    type: ActionTypes.SET_ERRORS,
    payload: {
      error,
      errors,
    },
  });
}

export interface IAuthFormProps {
  isCreating?: boolean;
  onSubmit: Function;
  buttonTitle: string;
}

const LoginForm = (props: IAuthFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailState, emailDispatcher] = useReducer(formReducer, {
    ...initialFormState,
  });
  const [usernameState, usernameDispatcher] = useReducer(formReducer, {
    ...initialFormState,
  });
  const [passwordState, passwordDispatcher] = useReducer(formReducer, {
    ...initialFormState,
  });

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const submit = async () => {
    validateUsername();
    validateEmail();
    validatePassword();
    if (emailState.error || passwordState.error) {
      return;
    }

    try {
      setIsSubmitting(true);
      await props.onSubmit({
        username: usernameState.value,
        email: emailState.value,
        password: passwordState.value,
      });
    } catch (error) {
      console.log('Error', error);
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  const validateUsername = () => {
    validateField({
      dispatcher: usernameDispatcher,
      value: usernameState.value,
      validateFn: (username: string) => username.length > 3,
    });
  };

  const validateEmail = () => {
    validateField({
      dispatcher: emailDispatcher,
      value: emailState.value,
      validateFn: isValid,
    });
  };

  const validatePassword = () => {
    validateField({
      dispatcher: passwordDispatcher,
      value: passwordState.value,
      validateFn: (str: string) => {
        const patterns = [/[a-z]/, /[A-Z]/, /[0-9]/];
        return (
          str.length >= 8 &&
          patterns.every((pattern) => matchesPattern(str, pattern, 'g'))
        );
      },
    });
  };

  return (
    <>
      <View style={stl.form}>
        {(props.isCreating && (
          <View style={stl.formControl}>
            <View style={stl.label}>
              <Text style={stl.labelText}>Nome</Text>
            </View>
            <TextInput
              autoCapitalize="none"
              style={stl.input}
              value={usernameState.value}
              editable={!isSubmitting}
              keyboardType="default"
              textContentType="name"
              placeholder="Digite seu nome"
              placeholderTextColor="#898989"
              onBlur={validateUsername}
              onChangeText={(value) =>
                usernameDispatcher({
                  type: ActionTypes.SET_VALUE,
                  payload: { value },
                })
              }
            />
            <FormErrors messages={usernameErrorMessages} {...usernameState} />
          </View>
        )) ||
          null}
        <View style={stl.formControl}>
          <View style={stl.label}>
            <Text style={stl.labelText}>Email</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            style={stl.input}
            value={emailState.value}
            editable={!isSubmitting}
            keyboardType="email-address"
            textContentType="username"
            placeholder="Digite seu email"
            placeholderTextColor="#898989"
            onBlur={validateEmail}
            onChangeText={(value) =>
              emailDispatcher({
                type: ActionTypes.SET_VALUE,
                payload: { value },
              })
            }
          />
          <FormErrors messages={emailErrorMessages} {...emailState} />
        </View>
        <View style={stl.formControl}>
          <View style={stl.label}>
            <Text style={stl.labelText}>Senha</Text>
            <Text style={stl.labelInstructions}>
              Sua senha deve conter pelo menos uma letra maiúscula e minúscula,
              um número e oito caracteres
            </Text>
          </View>
          <TextInput
            style={stl.input}
            value={passwordState.value}
            editable={!isSubmitting}
            textContentType={props.isCreating ? 'newPassword' : 'password'}
            placeholder="Insira sua senha"
            placeholderTextColor="#898989"
            passwordRules="required: lower; required: upper; required: digit; required: [-]; minlength: 6;"
            onChangeText={(value) =>
              passwordDispatcher({
                type: ActionTypes.SET_VALUE,
                payload: { value },
              })
            }
            secureTextEntry
            onBlur={validatePassword}
          />
          <FormErrors messages={passwordErrorMessages} {...passwordState} />
        </View>
      </View>
      <View style={stl.actions}>
        <TouchableOpacity
          style={stl.button}
          disabled={isSubmitting}
          onPress={submit}
        >
          {(isSubmitting && <ActivityIndicator color="#000" />) || (
            <Text style={stl.buttonText}>{props.buttonTitle}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const stl = StyleSheet.create({
  form: {
    marginBottom: 60,
  },
  formControl: {
    maxHeight: 80,
    marginVertical: 20,
  },
  label: {
    marginVertical: 5,
  },
  labelText: {
    fontSize: 20,
  },
  input: {
    paddingVertical: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  actions: {},
  button: {
    backgroundColor: '#ea94a5',
    padding: 16,
    borderRadius: 50,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelInstructions: {
    fontSize: 12,
    color: '#232323',
  },
});

export default LoginForm;
