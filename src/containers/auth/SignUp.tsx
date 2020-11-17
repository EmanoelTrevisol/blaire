import React from 'react';
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
  ScrollView,
  SafeAreaView,
} from 'react-native';

import AuthForm from '@components/auth/AuthForm';
import Auth from '@utils/firebase/Auth';
import { onSignUp } from '@utils/Toaster';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Colors from '@assets/colors';

const SignIn = () => {
  const navigation = useNavigation();

  const signUp = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const user = (await Auth.signUp({
      username,
      email,
      password,
    })) as FirebaseAuthTypes.User;

    onSignUp(user.displayName!);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>Crie sua conta</Text>
            </View>

            <View style={styles.pageContent}>
              <AuthForm
                isCreating
                onSubmit={signUp}
                buttonTitle="Criar conta"
              />
            </View>
            <View style={styles.pageFooter}>
              <Text style={styles.optionText}>Já possui uma conta?</Text>
              <Button
                color={Colors.primary}
                title="Fazer login"
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
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
