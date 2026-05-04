import React from 'react';

export const useAuth = jest.fn(() => ({
  user: null,
  role: null,
  setRole: jest.fn(),
  loading: false,
  signOut: jest.fn(),
}));

export const AuthProvider = ({ children }) => <>{children}</>;
