import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileCreation from './ProfileCreation';

describe('ProfileCreation Component', () => {
  test('renders the profile creation form', () => {
    render(<ProfileCreation />);
    expect(screen.getByText(/create your profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience level:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cultural preferences:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload profile image:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create profile/i })).toBeInTheDocument();
  });

  test('allows input to be entered in fields', () => {
    render(<ProfileCreation />);
    const nameInput = screen.getByLabelText(/name:/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    const emailInput = screen.getByLabelText(/email:/i);
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput.value).toBe('john@example.com');
  });

  test('submits the form and checks for alert', () => {
    window.alert = jest.fn();
    render(<ProfileCreation />);
    const submitButton = screen.getByRole('button', { name: /create profile/i });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith('Profile Created!');
  });

  test('handles image upload', async () => {
    render(<ProfileCreation />);
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/upload profile image:/i);

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    });
    fireEvent.change(fileInput);

    await waitFor(() => expect(fileInput.files[0]).toBe(file));
    expect(fileInput.files[0].name).toBe('chucknorris.png');
  });
});
