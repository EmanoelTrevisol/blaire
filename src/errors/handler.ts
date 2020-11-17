import { simpleShow } from '@utils/Toaster';

function getErrorMessage(error: any, message?: string): string {
  const defaultMessage =
    message ||
    'Ops... aconteceu um erro inesperado. Por favor, tente novamente';

  const code = error.code;
  if (!code) {
    return defaultMessage;
  }

  if (code === 'auth/user-not-found') {
    return 'Ops... não estamos conseguindo encontrar esse usuário';
  } else if (code === 'auth/wrong-password') {
    return 'Ops... parece que a senha está incorreta';
  } else if (code === 'auth/invalid-email') {
    return 'Ops... parece que a senha está incorreta';
  } else if (code === 'auth/email-already-in-use') {
    return 'Ops... esse email já está sendo usado';
  } else if (code === 'auth/weak-password') {
    return 'Ops... precisamos de uma senha mais forte';
  } else {
    return defaultMessage;
  }
}

export function treatError(error: any, defaultMessage?: string) {
  if (!error.toasted) {
    simpleShow(getErrorMessage(error, defaultMessage));
    error.toasted = true;
    throw error;
  }
  throw error;
}
