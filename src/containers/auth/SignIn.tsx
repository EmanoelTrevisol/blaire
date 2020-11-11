import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import AuthForm from '../../components/AuthForm';
import Auth from '../../utils/firebase/Auth';
import { onSignIn } from '../../utils/Toaster';

const SignIn = () => {
  const navigation = useNavigation();

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      console.log('Signin in', email, password);
      const usr = await Auth.signIn(email, password);
      console.log('USER CREDENTIAL', usr);
      onSignIn(usr.user.displayName || usr.user.email!);
      return usr;
    } catch (error) {
      console.log('Error signing in', error);
    }
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
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
        <Button title="Criar agora mesmo" onPress={goToSignUp} />
      </View>
    </KeyboardAvoidingView>
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
