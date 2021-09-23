import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import Routes from '../src/Routes';

test('renders learn react link', () => {
  render(<Routes />);
  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();
});
