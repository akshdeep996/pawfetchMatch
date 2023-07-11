import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Authentication from './Authentication';

jest.mock('../API/AuthAPI/login', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Authentication', () => {
  test('renders the component with input elements and "Hey Hooman!" text', () => {
    render(
      <Router>
        <Authentication />
      </Router>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const heyHoomanText = screen.getByText(/Hey Hooman!/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(heyHoomanText).toBeInTheDocument();
  });
});
