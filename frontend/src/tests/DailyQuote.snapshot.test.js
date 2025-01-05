import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailyQuote from '../pages/dailyquote';
import { AuthProvider } from '../AuthContext';

jest.mock('next/link', () => ({ children, ...props }) => (
  <a {...props}>{children}</a>
));

test('renders DailyQuote correctly', () => {
  const { asFragment } = render(
    <AuthProvider>
      <DailyQuote />
    </AuthProvider>
  );

  // Erstellt oder überprüft den Snapshot
  expect(asFragment()).toMatchSnapshot();
});
