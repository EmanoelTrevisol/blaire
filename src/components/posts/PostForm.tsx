import React, { useState, useReducer } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { cloneDeep } from 'lodash';

import { FormActionTypes, ActionTypes } from '../../store/form/types';
import { formReducer } from '../../store/form/reducer';
import initialFormState from '../../store/form/state';

import FormErrors from '../FormErrors';

const modifiedInitialFormState = {
  ...initialFormState,
  errors: {
    ...initialFormState.errors,
    minLength: true,
    maxLength: false,
  },
};

const titleErrorMessages = {
  required: 'Ops... tá vazio aqui.',
  minLength: 'Ops... conta um pouco mais pra gente.',
  maxLength:
    'Ops... assim tá muito comprido. Precisamos que tenha no máximo 35 caracteres.',
};

const bodyErrorMessages = {
  required: 'Ops... tá vazio aqui.',
  minLength: 'Ops... conta um pouco mais pra gente.',
  maxLength:
    'Ops... assim tá muito comprido. Precisamos que tenha no máximo 280 caracteres.',
};

const titleLengthValidations = {
  min: 5,
  max: 35,
};

const bodyLengthValidations = {
  min: 30,
  max: 280,
};

function validateField({
  dispatcher,
  value,
  lengthLimits,
}: {
  dispatcher: React.Dispatch<FormActionTypes>;
  value: string;
  lengthLimits: typeof titleLengthValidations | typeof bodyLengthValidations;
}) {
  dispatcher({
    type: ActionTypes.SET_DIRTY,
    payload: {
      dirty: true,
    },
  });

  let error = false;
  const errors = {
    required: false,
    minLength: false,
    maxLength: false,
  };

  // console.log('==================================================');
  // console.log('VALIDATING STRING LENGTH', value.length, lengthLimits);
  // console.log('MIN LENGTH', value.length < lengthLimits.min);
  // console.log('MAX LENGTH', value.length > lengthLimits.max);
  // console.log('VALUE: ', value);
  // console.log('==================================================\n\n');

  if (!value) {
    error = true;
    errors.required = true;
    errors.valid = false;
  } else if (value.length < lengthLimits.min) {
    error = true;
    errors.required = false;
    errors.minLength = true;
    errors.maxLength = false;
  } else if (value.length > lengthLimits.max) {
    error = true;
    errors.required = false;
    errors.minLength = false;
    errors.maxLength = true;
  } else {
    error = false;
    errors.required = false;
    errors.maxLength = false;
    errors.minLength = false;
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

const PostForm = (props: IAuthFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [titleState, titleDispatcher] = useReducer(
    formReducer,
    cloneDeep(modifiedInitialFormState),
  );
  const [bodyState, bodyDispatcher] = useReducer(
    formReducer,
    cloneDeep(modifiedInitialFormState),
  );

  const submit = async () => {
    validateTitle();
    validateBody();
    // console.log(
    //   'HAS ERROR',
    //   titleState.error || bodyState.error,
    //   titleState,
    //   bodyState,
    // );
    if (titleState.error || bodyState.error) {
      return;
    }

    try {
      setIsSubmitting(true);
      await props.onSubmit({
        title: titleState.value,
        body: bodyState.value,
      });
    } catch (error) {
      console.log('Error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateTitle = () => {
    // console.log('ABOUT TO VALIDATE: Title', titleLengthValidations);
    validateField({
      dispatcher: titleDispatcher,
      value: titleState.value,
      lengthLimits: titleLengthValidations,
    });
  };

  const validateBody = () => {
    // console.log('ABOUT TO VALIDATE: Body', bodyLengthValidations);
    validateField({
      dispatcher: bodyDispatcher,
      value: bodyState.value,
      lengthLimits: bodyLengthValidations,
    });
  };

  return (
    <>
      <View style={stl.form}>
        <View style={stl.formControl}>
          <View style={stl.label}>
            <Text style={stl.labelText}>Título</Text>
          </View>
          <TextInput
            autoCapitalize="none"
            style={stl.input}
            value={titleState.value}
            editable={!isSubmitting}
            keyboardType="email-address"
            textContentType="username"
            placeholder="Crie seu título"
            placeholderTextColor="#898989"
            onBlur={validateTitle}
            onChangeText={(value) =>
              titleDispatcher({
                type: ActionTypes.SET_VALUE,
                payload: { value },
              })
            }
          />
          <FormErrors messages={titleErrorMessages} {...titleState} />
        </View>
        <View style={stl.formControl}>
          <View style={stl.label}>
            <Text style={stl.labelText}>Post</Text>
          </View>
          <TextInput
            style={stl.input}
            value={bodyState.value}
            editable={!isSubmitting}
            placeholder="Mal posso esperar para ler o que você tem para contar"
            placeholderTextColor="#898989"
            onChangeText={(value) =>
              bodyDispatcher({
                type: ActionTypes.SET_VALUE,
                payload: { value },
              })
            }
            onBlur={validateBody}
          />
          <FormErrors messages={bodyErrorMessages} {...bodyState} />
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

export default PostForm;
