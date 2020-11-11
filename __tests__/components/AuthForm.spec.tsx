import React from 'react';
import AuthForm, { IAuthFormProps } from '@components/AuthForm';
import FormErrors from '@components/FormErrors';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

const PASSWORD_INPUT_PLACEHOLDER = 'Insira sua senha';
const EMAIL_INPUT_PLACEHOLDER = 'Digite seu email';
let props: IAuthFormProps;

describe('AuthForm.tsx', () => {
  const renderComp = (cpProps: IAuthFormProps) => {
    return render(<AuthForm {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      buttonTitle: 'Título do botão',
      onSubmit: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });

  describe('inputs and submition behavior', () => {
    describe('does not call onSubmit', () => {
      test('when email and password empty', async () => {
        const { getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when only email is empty', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const passwordInput = queryByPlaceholderText(
          PASSWORD_INPUT_PLACEHOLDER,
        )!;

        act(() => fireEvent.changeText(passwordInput, 'EssaEH4n0v4s3nh4'));
        act(() => fireEvent(passwordInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when password is invalid', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const passwordInput = queryByPlaceholderText(
          PASSWORD_INPUT_PLACEHOLDER,
        )!;

        act(() => fireEvent.changeText(passwordInput, 'abc'));
        act(() => fireEvent(passwordInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when email is invalid', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const emailInput = queryByPlaceholderText(EMAIL_INPUT_PLACEHOLDER)!;

        act(() => fireEvent.changeText(emailInput, 'email'));
        act(() => fireEvent(emailInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    describe('calls onSubmit', () => {
      test('with valid email and password', async () => {
        props.onSubmit = jest.fn(() => Promise.resolve());

        const { queryByPlaceholderText, getByText } = renderComp(props);
        const args = {
          email: 'teste@test.com',
          password: 'EssaEH4n0v4s3nh4',
        };

        // const submitButton = ;
        const emailInput = queryByPlaceholderText(EMAIL_INPUT_PLACEHOLDER)!;
        const passwordInput = queryByPlaceholderText(
          PASSWORD_INPUT_PLACEHOLDER,
        )!;

        act(() => fireEvent.changeText(emailInput, args.email));
        act(() => fireEvent(emailInput, 'blur'));
        act(() => fireEvent.changeText(passwordInput, args.password));
        act(() => fireEvent(passwordInput, 'blur'));

        await act(() => fireEvent.press(getByText(props.buttonTitle)));

        expect(props.onSubmit).toHaveBeenCalledWith(args);
      });
    });

    describe('sends correct error props to FormErrors', () => {
      describe('email errors', () => {
        test('required', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const emailInput = getByPlaceholderText(EMAIL_INPUT_PLACEHOLDER);
          act(() => fireEvent(emailInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(true);
          expect(formErrorProps.errors.valid).toBe(false);
        });
        test('valid', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const emailInput = getByPlaceholderText(EMAIL_INPUT_PLACEHOLDER);

          act(() => fireEvent.changeText(emailInput, 'email'));
          act(() => fireEvent(emailInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.valid).toBe(true);
        });
      });

      describe('password errors', () => {
        test('required', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const passwordInput = getByPlaceholderText(
            PASSWORD_INPUT_PLACEHOLDER,
          );

          act(() => fireEvent(passwordInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(true);
          expect(formErrorProps.errors.valid).toBe(false);
        });

        test('valid', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const passwordInput = getByPlaceholderText(
            PASSWORD_INPUT_PLACEHOLDER,
          );

          act(() => fireEvent.changeText(passwordInput, 'email'));
          act(() => fireEvent(passwordInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.valid).toBe(true);
        });
      });

      describe('valid inputs', () => {
        test('valid email', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const emailInput = getByPlaceholderText(EMAIL_INPUT_PLACEHOLDER);

          act(() => fireEvent.changeText(emailInput, 'teste@teste.com'));
          act(() => fireEvent(emailInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(false);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.valid).toBe(false);
        });

        test('valid password', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const passwordInput = getByPlaceholderText(
            PASSWORD_INPUT_PLACEHOLDER,
          );

          act(() => fireEvent.changeText(passwordInput, 'Umas3nh4Valid4'));
          act(() => fireEvent(passwordInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(false);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.valid).toBe(false);
        });
      });
    });
  });
});
