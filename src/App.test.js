import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import App from './Routes';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();
});
