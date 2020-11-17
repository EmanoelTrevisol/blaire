import React from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import AuthForm from '@components/auth/AuthForm';
import Auth from '@utils/firebase/Auth';
import { onSignIn } from '@utils/Toaster';

const SignIn = () => {
  const navigation = useNavigation();

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const cresdentials = (await Auth.signIn(
      email,
      password,
    )) as FirebaseAuthTypes.UserCredential;

    onSignIn(cresdentials.user.displayName!);

    return cresdentials;
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.pageTitle}>
          <Text style={styles.pageTitleText}>Entre com sua conta</Text>
        </View>

        <View style={styles.pageContent}>
          <AuthForm onSubmit={signin} buttonTitle="Fazer login" />
        </View>
        <View style={styles.pageFooter}>
          <Text style={styles.optionText}>Ainda não possui uma conta?</Text>
          <Button title="Cadastrar" onPress={goToSignUp} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  pageTitle: {
    marginBottom: 15,
    alignSelf: 'center',
  },
  pageTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pageContent: {
    marginBottom: 50,
  },
  pageFooter: {
    alignSelf: 'center',
  },
  optionText: {
    marginBottom: 5,
  },
});

export default SignIn;
