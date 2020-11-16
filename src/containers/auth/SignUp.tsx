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

import AuthForm from '@components/auth/AuthForm';
import Auth from '@utils/firebase/Auth';
import { onSignUp } from '@utils/Toaster';

const SignIn = () => {
  const navigation = useNavigation();

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const usr = await Auth.signUp(email, password);
      onSignUp(usr.user.displayName || usr.user.email!);
    } catch (error) {
      console.log('Error signing up', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.pageTitle}>
        <Text style={styles.pageTitleText}>Crie sua conta</Text>
      </View>

      <View style={styles.pageContent}>
        <AuthForm isCreating onSubmit={signUp} buttonTitle="Criar conta" />
      </View>
      <View style={styles.pageFooter}>
        <Text style={styles.optionText}>Já possui uma conta?</Text>
        <Button
          title="Fazer login"
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        />
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
