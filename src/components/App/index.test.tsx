import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

import StoreProvider from '../../utilities/store';

test('Renders the top menu', () => {
  const { getByText } = render(<StoreProvider><App /></StoreProvider>);
  const linkElement = getByText(/terminal 1/i);
  expect(linkElement).toBeInTheDocument();
});
