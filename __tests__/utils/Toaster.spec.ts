import { onSignUp, onSignIn } from '@utils/Toaster';
import Toast from 'react-native-simple-toast';

let username: string;

describe('Toaster.ts', () => {
  beforeEach(() => {
    username = 'Emanoel';
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Calls Toaster.show on onSignIn method', () => {
    onSignIn(username);

    expect(Toast.show).toHaveBeenCalledWith(
      `Muito bom te ver novamente, ${username}!`,
    );
  });

  test('Calls Toaster.show on onSignUp method', () => {
    onSignUp(username);

    expect(Toast.show).toHaveBeenCalledWith(
      `Seja muito bem vindo, ${username}!`,
    );
  });
});
