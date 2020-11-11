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
      },
      dirty: true,
      error: true,
      errors: {
        valid: true,
        required: true,
      },
    };
  });

  test('matches snaptshot', () => {
    const { comp } = render(props);

    expect(comp.toJSON()).toMatchSnapshot();
  });

  test('shows required and valid error', () => {
    const { root } = render(props);
    const errors = root.findAllByType(Text);

    expect(errors.length).toBe(2);

    expect(errors[0].props.children).toBe(props.messages.required);
    expect(errors[1].props.children).toBe(props.messages.valid);
  });

  test('hides required error when updated', () => {
    const newProps = { ...props, errors: { ...props.errors } };

    newProps.errors.required = false;

    const { root, comp } = render(props);
    const errors = root.findAllByType(Text);

    expect(errors.length).toBe(2);

    comp.update(<FormErrors {...newProps} />);

    const newErrors = root.findAllByType(Text);
    expect(newErrors.length).toBe(1);

    expect(newErrors[0].props.children).not.toBe(props.messages.required);
  });

  test('hides valid error when updated', () => {
    const newProps = { ...props, errors: { ...props.errors } };

    newProps.errors.valid = false;

    const { root, comp } = render(props);
    const errors = root.findAllByType(Text);

    expect(errors.length).toBe(2);

    comp.update(<FormErrors {...newProps} />);

    const newErrors = root.findAllByType(Text);
    expect(newErrors.length).toBe(1);

    expect(newErrors[0].props.children).not.toBe(props.messages.valid);
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

  test('changes required and valid errors correctly when props update', () => {
    const newProps = { ...props, errors: { ...props.errors } };

    props.errors.valid = true;
    props.errors.required = false;

    newProps.errors.valid = false;
    newProps.errors.required = true;

    const { root, comp } = render(props);
    const firstErrors = root.findAllByType(Text);

    expect(firstErrors.length).toBe(1);
    expect(firstErrors[0].props.children).toBe(props.messages.valid);

    comp.update(<FormErrors {...newProps} />);

    const updatedErrors = root.findAllByType(Text);

    expect(updatedErrors.length).toBe(1);
    expect(updatedErrors[0].props.children).not.toBe(props.messages.valid);
  });
});
