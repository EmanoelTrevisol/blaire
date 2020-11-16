import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from 'react-native';

import NewsCard from '@components/news/NewsCard';
import { news } from '@models/fakeData/news';
import { INews } from '@models/News';

let props: INews;

describe('NewsCard.tsx', () => {
  const renderComp = (cpProps: INews) => {
    return render(<NewsCard {...cpProps} />);
  };

  beforeEach(() => {
    props = { ...news[0] };
  });

  test('matches snapshot', () => {
    const { toJSON } = renderComp(props);

    expect(toJSON()).toMatchSnapshot();
  });

  test('has props in the document', () => {
    const { getByText, UNSAFE_getByType } = renderComp(props);

    const profilePicture = UNSAFE_getByType(Image);

    expect(profilePicture).toBeDefined();
    expect(profilePicture.props.source).toEqual({
      uri: props.profilePicture,
    });
    expect(getByText(props.message)).toBeDefined();
    expect(getByText(props.createdAt)).toBeDefined();
    expect(getByText(props.username)).toBeDefined();
    expect(getByText(props.username)).toBeDefined();
  });
});
