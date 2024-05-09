import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Import your App component

test('renders search bar with placeholder text', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText('Search...');
  expect(searchInput).toBeInTheDocument();
});




