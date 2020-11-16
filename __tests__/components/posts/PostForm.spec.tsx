import React from 'react';
import PostForm, { IProps } from '@components/posts/PostForm';
import FormErrors from '@/components/form/FormErrors';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

const TITLE_INPUT_PLACEHOLDER = 'Crie seu título';
const BODY_INPUT_PLACEHOLDER =
  'Mal posso esperar para ler o que você tem para contar';

let props: IProps;

describe('PostForm.tsx', () => {
  const renderComp = (cpProps: IProps) => {
    return render(<PostForm {...cpProps} />);
  };

  beforeEach(() => {
    props = {
      buttonTitle: 'Enviar',
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
      test('when title and body empty', async () => {
        const { getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when only title is empty', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const bodyInput = queryByPlaceholderText(BODY_INPUT_PLACEHOLDER)!;

        act(() => fireEvent.changeText(bodyInput, 'EssaEH4n0v4s3nh4'));
        act(() => fireEvent(bodyInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when body is invalid', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const bodyInput = queryByPlaceholderText(BODY_INPUT_PLACEHOLDER)!;

        act(() => fireEvent.changeText(bodyInput, 'abc'));
        act(() => fireEvent(bodyInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });

      test('when title is invalid', async () => {
        const { queryByPlaceholderText, getByText } = renderComp(props);

        const submitButton = getByText(props.buttonTitle);
        const titleInput = queryByPlaceholderText(TITLE_INPUT_PLACEHOLDER)!;

        act(() => fireEvent.changeText(titleInput, 'title'));
        act(() => fireEvent(titleInput, 'blur'));

        await waitFor(() => fireEvent.press(submitButton));

        expect(props.onSubmit).not.toHaveBeenCalled();
      });
    });

    describe('calls onSubmit', () => {
      test('with valid title and body', async () => {
        props.onSubmit = jest.fn(() => Promise.resolve());

        const { queryByPlaceholderText, getByText } = renderComp(props);

        const args = {
          title: 'Esse é um título de POST',
          body: 'Esse post é muito informativo e é bem interessante',
        };

        // const submitButton = ;
        const titleInput = queryByPlaceholderText(TITLE_INPUT_PLACEHOLDER)!;
        const bodyInput = queryByPlaceholderText(BODY_INPUT_PLACEHOLDER)!;

        act(() => fireEvent.changeText(titleInput, args.title));
        act(() => fireEvent(titleInput, 'blur'));
        act(() => fireEvent.changeText(bodyInput, args.body));
        act(() => fireEvent(bodyInput, 'blur'));

        await act(() => fireEvent.press(getByText(props.buttonTitle)));

        expect(props.onSubmit).toHaveBeenCalledWith(args);
      });
    });

    describe('sends correct error props to FormErrors', () => {
      describe('title errors', () => {
        test('required', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const titleInput = getByPlaceholderText(TITLE_INPUT_PLACEHOLDER);
          act(() => fireEvent(titleInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(true);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });
        test('minLength', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const titleInput = getByPlaceholderText(TITLE_INPUT_PLACEHOLDER);

          act(() => fireEvent.changeText(titleInput, 'Tí'));
          act(() => fireEvent(titleInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(true);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });

        test('maxLength', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const titleInput = getByPlaceholderText(TITLE_INPUT_PLACEHOLDER);

          act(() =>
            fireEvent.changeText(
              titleInput,
              'Título com mais do que trinta e cinco caracteres',
            ),
          );
          act(() => fireEvent(titleInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(true);
        });
      });

      describe('body errors', () => {
        test('required', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const bodyInput = getByPlaceholderText(BODY_INPUT_PLACEHOLDER);

          act(() => fireEvent(bodyInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(true);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });

        test('minLength', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const bodyInput = getByPlaceholderText(BODY_INPUT_PLACEHOLDER);

          act(() => fireEvent.changeText(bodyInput, 'Corpo do post'));
          act(() => fireEvent(bodyInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(true);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });

        test('maxLength', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const bodyInput = getByPlaceholderText(BODY_INPUT_PLACEHOLDER);

          act(() =>
            fireEvent.changeText(
              bodyInput,
              'Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres, Corpo do post com mais de 280 caracteres',
            ),
          );
          act(() => fireEvent(bodyInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(true);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(true);
        });
      });

      describe('valid inputs', () => {
        test('valid title', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const titleInput = getByPlaceholderText(TITLE_INPUT_PLACEHOLDER);

          act(() => fireEvent.changeText(titleInput, 'Novo post'));
          act(() => fireEvent(titleInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[0].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(false);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });

        test('valid body', () => {
          const { getByPlaceholderText, UNSAFE_getAllByType } = renderComp(
            props,
          );

          const bodyInput = getByPlaceholderText(BODY_INPUT_PLACEHOLDER);

          act(() =>
            fireEvent.changeText(
              bodyInput,
              'Esse é um corpo de post válido. Tem mais de 35 caracteres e menos de 280',
            ),
          );
          act(() => fireEvent(bodyInput, 'blur'));

          const formErrors = UNSAFE_getAllByType(FormErrors);

          const formErrorProps = formErrors[1].props;

          expect(formErrorProps.dirty).toBe(true);
          expect(formErrorProps.error).toBe(false);
          expect(formErrorProps.errors.required).toBe(false);
          expect(formErrorProps.errors.minLength).toBe(false);
          expect(formErrorProps.errors.maxLength).toBe(false);
        });
      });
    });
  });
});
