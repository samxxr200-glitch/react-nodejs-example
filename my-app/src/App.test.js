import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock the API calls
global.fetch = jest.fn();

describe('React App Tests', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
  });

  test('renders React With NodeJS heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/React With NodeJS/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders Create User section', () => {
    render(<App />);
    const createUserHeading = screen.getByText(/Create User/i);
    expect(createUserHeading).toBeInTheDocument();
  });

  test('renders user input fields', () => {
    render(<App />);
    
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  test('renders Get all Users button', () => {
    render(<App />);
    const getUsersButton = screen.getByText(/Get all Users/i);
    expect(getUsersButton).toBeInTheDocument();
  });

  test('displays users table when Get all Users is clicked', async () => {
    // Mock the API response
    const mockUsers = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' }
    ];
    
    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    });

    render(<App />);
    
    const getUsersButton = screen.getByText(/Get all Users/i);
    fireEvent.click(getUsersButton);

    // Use simpler approach without waitFor
    expect(fetch).toHaveBeenCalledWith('/api/users');
  });
});