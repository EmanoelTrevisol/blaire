import Toast from 'react-native-simple-toast';

export function onSignUp(username: string) {
  return Toast.show(`Seja muito bem vindo, ${username}!`);
}

export function onSignIn(username: string) {
  return Toast.show(`Muito bom te ver novamente, ${username}!`);
}

export function simpleShow(message: string) {
  return Toast.show(message);
}
