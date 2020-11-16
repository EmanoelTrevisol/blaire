import React from 'react';
import FormErrors, { IProps } from '@components/FormErrors';
import { Text } from 'react-native';

import renderer from 'react-test-renderer';
let props: IProps;

describe('FormErrors.tsx', () => {
  const render = (cpProps: IProps) => {
    const comp = renderer.create(<FormErrors {...cpProps} />);
    return {
      comp,
      root: comp.root,
    };
  };

  beforeEach(() => {
    props = {
      messages: {
        required: 'Obrigatório',
        valid: 'Inválido',
        minLength: 'Tem que ser maior',
        maxLength: 'Tem que ser menor',
      },
      dirty: true,
      error: true,
      errors: {
        valid: true,
        required: true,
        minLength: true,
        maxLength: true,
      },
    };
  });

  test('matches snaptshot', () => {
    const { comp } = render(props);

    expect(comp.toJSON()).toMatchSnapshot();
  });

  describe('show error', () => {
    test('required', () => {
      props.errors.valid = false;
      props.errors.minLength = false;
      props.errors.maxLength = false;

      const { root } = render(props);
      const errors = root.findAllByType(Text);

      expect(errors.length).toBe(1);

      expect(errors[0].props.children).toBe(props.messages.required);
    });
    test('valid', () => {
      props.errors.required = false;
      props.errors.minLength = false;
      props.errors.maxLength = false;

      const { root } = render(props);
      const errors = root.findAllByType(Text);

      expect(errors.length).toBe(1);

      expect(errors[0].props.children).toBe(props.messages.valid);
    });
    test('minLength', () => {
      props.errors.required = false;
      props.errors.valid = false;
      props.errors.maxLength = false;

      const { root } = render(props);
      const errors = root.findAllByType(Text);

      expect(errors.length).toBe(1);

      expect(errors[0].props.children).toBe(props.messages.minLength);
    });
    test('maxLength', () => {
      props.errors.valid = false;
      props.errors.required = false;
      props.errors.minLength = false;

      const { root } = render(props);
      const errors = root.findAllByType(Text);

      expect(errors.length).toBe(1);

      expect(errors[0].props.children).toBe(props.messages.maxLength);
    });
  });

  describe('hides error message', () => {
    test('when required error is updated', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      newProps.errors.required = false;

      const { root, comp } = render(props);
      const errors = root.findAllByType(Text);

      comp.update(<FormErrors {...newProps} />);

      const newErrors = root.findAllByType(Text);

      expect(errors.length).toBe(1);
      expect(newErrors.length).toBe(1);
      expect(newErrors[0].props.children).not.toBe(props.messages.required);
    });

    test('when valid error is updated', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      newProps.errors.valid = false;

      const { root, comp } = render(props);
      const errors = root.findAllByType(Text);

      comp.update(<FormErrors {...newProps} />);

      const newErrors = root.findAllByType(Text);
      expect(errors.length).toBe(1);
      expect(newErrors.length).toBe(1);
      expect(newErrors[0].props.children).not.toBe(props.messages.valid);
    });

    test('when minLength error is updated', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      newProps.errors.minLength = false;

      const { root, comp } = render(props);
      const errors = root.findAllByType(Text);

      comp.update(<FormErrors {...newProps} />);

      const newErrors = root.findAllByType(Text);
      expect(errors.length).toBe(1);
      expect(newErrors.length).toBe(1);
      expect(newErrors[0].props.children).not.toBe(props.messages.minLength);
    });

    test('when maxLength error is updated', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      newProps.errors.maxLength = false;

      const { root, comp } = render(props);
      const errors = root.findAllByType(Text);

      comp.update(<FormErrors {...newProps} />);

      const newErrors = root.findAllByType(Text);
      expect(errors.length).toBe(1);
      expect(newErrors.length).toBe(1);
      expect(newErrors[0].props.children).not.toBe(props.messages.maxLength);
    });
  });

  test('renders null when dirty is false', () => {
    props.dirty = false;
    const { comp } = render(props);

    expect(comp.toJSON()).toBe(null);
  });

  test('renders null when error is false', () => {
    props.error = false;
    const { comp } = render(props);

    expect(comp.toJSON()).toBe(null);
  });

  test('hides errors when error is false', () => {
    const newProps = {
      ...props,
      error: false,
      dirty: false,
      errors: { ...props.errors, required: false, valid: false },
    };
    const { comp } = render(props);

    comp.update(<FormErrors {...newProps} />);

    expect(comp.toJSON()).toBe(null);
  });

  describe('changes error message component props correctly when props update', () => {
    test('error messages ', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      props.errors.required = false;
      props.errors.minLength = false;
      props.errors.maxLength = false;
      props.errors.valid = true;

      newProps.errors.valid = false;
      newProps.errors.minLength = false;
      newProps.errors.maxLength = false;
      newProps.errors.required = true;

      const { root, comp } = render(props);
      const firstErrors = root.findAllByType(Text);

      expect(firstErrors.length).toBe(1);
      expect(firstErrors[0].props.children).toBe(props.messages.valid);

      comp.update(<FormErrors {...newProps} />);

      const updatedErrors = root.findAllByType(Text);

      expect(updatedErrors.length).toBe(1);
      expect(updatedErrors[0].props.children).toBe(props.messages.required);
    });

    test('testID prop ', () => {
      const newProps = { ...props, errors: { ...props.errors } };

      props.errors.required = false;
      props.errors.minLength = false;
      props.errors.maxLength = false;
      props.errors.valid = true;

      newProps.errors.valid = false;
      newProps.errors.minLength = false;
      newProps.errors.maxLength = false;
      newProps.errors.required = true;

      const { root, comp } = render(props);
      const firstErrors = root.findAllByType(Text);

      expect(firstErrors.length).toBe(1);
      expect(firstErrors[0].props.testID).toBe('valid-error');

      comp.update(<FormErrors {...newProps} />);

      const updatedErrors = root.findAllByType(Text);

      expect(updatedErrors.length).toBe(1);
      expect(updatedErrors[0].props.testID).toBe('required-error');
    });
  });
});
