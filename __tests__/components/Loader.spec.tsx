import React from 'react';
import { render } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import Loader, { IProps, Sizes } from '@components/Loader';

describe('Loader.tsx', () => {
  const renderComp = (props?: IProps) => {
    return render(<Loader {...props} />);
  };

  test('matches snapshot', () => {
    const { toJSON } = renderComp(undefined);

    expect(toJSON()).toMatchSnapshot();
  });

  test('passes default props to ActivityIndicator', () => {
    const { UNSAFE_getByType } = renderComp(undefined);

    const loader = UNSAFE_getByType(ActivityIndicator);

    expect(loader).toBeDefined();
    expect(loader.props.size).toBe('large');
    expect(loader.props.color).toBe('#000');
  });

  test('passes props correctly ActivityIndicator', () => {
    const size = Sizes.SMALL;
    const color = '#ff0000';

    const { UNSAFE_getByType } = renderComp({ size, color });

    const loader = UNSAFE_getByType(ActivityIndicator);

    expect(loader).toBeDefined();
    expect(loader.props.size).toBe(size);
    expect(loader.props.color).toBe(color);
  });
});
