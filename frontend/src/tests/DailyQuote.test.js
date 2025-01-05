import React from 'react';
import { render, screen } from '@testing-library/react';
import DailyQuote from '../pages/dailyquote';
import { useAuth } from '../AuthContext';

// Mock `next/link` to avoid errors with Next.js Link component during tests
jest.mock('next/link', () => ({ children, ...props }) => (
    <a {...props}>{children}</a>
));

// Mock `useAuth` function from `AuthContext`
jest.mock('../AuthContext', () => ({
    useAuth: jest.fn(),
}));

describe('DailyQuote Component', () => {
    test('renders the daily quote and tips when authenticated', () => {
        // Set up mock for authenticated state
        useAuth.mockReturnValue({ isAuthenticated: true });

        render(<DailyQuote />);

        // Check if the daily quote is displayed
        const quoteHeading = screen.getByText(/Inspirierendes Zitat des Tages/i);
        expect(quoteHeading).toBeInTheDocument();

        // Check if the tips section is displayed
        const tipsHeading = screen.getByText(/Wohlfühl-Tipps des Tages/i);
        expect(tipsHeading).toBeInTheDocument();
    });

    test('prompts the user to log in when not authenticated', () => {
        // Set up mock for unauthenticated state
        useAuth.mockReturnValue({ isAuthenticated: false });

        render(<DailyQuote />);

        // Check if the login prompt is displayed
        const loginPrompt = screen.getByText(/Bitte melde dich an/i);
        expect(loginPrompt).toBeInTheDocument();

        // Check if the login button is displayed
        const loginButton = screen.getByRole('link', { name: /Zum Login/i });
        expect(loginButton).toBeInTheDocument();
    });
});
