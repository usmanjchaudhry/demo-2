import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component tests', () => {
  

  

  test('typing "apple" does not display the pizza image', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'apple' } });
    const img = screen.queryByAltText('Pizza');
    expect(img).toBeNull();
  });

  

  test('clearing the input clears the displayed text', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'hello' } });
    fireEvent.change(input, { target: { value: '' } });
    expect(screen.queryByText('hello')).toBeNull();
  });

  test('navigates to the profile creation page when clicking the "Create Profile" button', () => {
    render(<App />);
    const createProfileButton = screen.getByText('Create Profile');
    fireEvent.click(createProfileButton);

    // Verify navigation by checking for the form elements
    expect(screen.getByText('Create Your Profile')).toBeInTheDocument();
    expect(screen.getByLabelText('Experience Level:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cultural Preferences:')).toBeInTheDocument();
  });

});
