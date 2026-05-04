import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';

// Create mock functions
const mockPush = jest.fn();
const mockSetRole = jest.fn();
const mockSignInWithEmailAndPassword = jest.fn();
const mockSignInWithPopup = jest.fn();
const mockCreateUserWithEmailAndPassword = jest.fn();
const mockSendPasswordResetEmail = jest.fn();
const mockUpdateProfile = jest.fn();
const mockSetDoc = jest.fn();
const mockDoc = jest.fn();

// Mock modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    role: null,
    setRole: mockSetRole,
    loading: false,
    signOut: jest.fn(),
  }),
}));

jest.mock('@/lib/firebase', () => ({
  auth: { currentUser: null },
  db: {},
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: (...args) => mockSignInWithPopup(...args),
  createUserWithEmailAndPassword: (...args) => mockCreateUserWithEmailAndPassword(...args),
  sendPasswordResetEmail: (...args) => mockSendPasswordResetEmail(...args),
  updateProfile: (...args) => mockUpdateProfile(...args),
}));

jest.mock('firebase/firestore', () => ({
  doc: (...args) => mockDoc(...args),
  setDoc: (...args) => mockSetDoc(...args),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the login form', () => {
      render(<LoginPage />);
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('name@organization.org')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    });

    it('should render role selector buttons', () => {
      render(<LoginPage />);
      expect(screen.getByText('NGO Staff')).toBeInTheDocument();
      expect(screen.getByText('Volunteer')).toBeInTheDocument();
    });

    it('should render sign in button', () => {
      render(<LoginPage />);
      expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    it('should render Google sign in button', () => {
      render(<LoginPage />);
      expect(screen.getByLabelText(/sign in with google/i)).toBeInTheDocument();
    });

    it('should render sign up link', () => {
      render(<LoginPage />);
      expect(screen.getByText(/sign up instead/i)).toBeInTheDocument();
    });
  });

  describe('Role Selection', () => {
    it('should select NGO Staff by default', () => {
      render(<LoginPage />);
      const ngoButton = screen.getByText('NGO Staff');
      expect(ngoButton).toHaveClass('bg-zinc-800');
    });

    it('should switch role when Volunteer is clicked', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      await user.click(screen.getByText('Volunteer'));
      const volunteerButton = screen.getByText('Volunteer');
      expect(volunteerButton).toHaveClass('bg-zinc-800');
    });
  });

  describe('Form Validation', () => {
    it('should show error for invalid email', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByText('Sign In');

      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      // Form validation should prevent Firebase call
      expect(mockSignInWithEmailAndPassword).not.toHaveBeenCalled();
    });

    it('should show error for short password', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByText('Sign In');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'short');
      await user.click(submitButton);

      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });

    it('should not call signInWithEmailAndPassword for invalid form', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByText('Sign In');

      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      expect(mockSignInWithEmailAndPassword).not.toHaveBeenCalled();
    });
  });

  describe('Sign In', () => {
    it('should call signInWithEmailAndPassword with correct credentials', async () => {
      const user = userEvent.setup();
      mockSignInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: '123' } });

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByText('Sign In');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'test@example.com',
          'password123'
        );
      });
    });

    it('should show create prompt on user not found', async () => {
      const user = userEvent.setup();
      mockSignInWithEmailAndPassword.mockRejectedValueOnce({
        code: 'auth/user-not-found',
      });

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const submitButton = screen.getByText('Sign In');

      await user.type(emailInput, 'newuser@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/create account/i)).toBeInTheDocument();
      });
    });
  });

  describe('Google Sign In', () => {
    it('should call signInWithPopup on Google button click', async () => {
      const user = userEvent.setup();
      mockSignInWithPopup.mockResolvedValueOnce({
        user: { uid: '456', email: 'google@example.com' },
      });

      render(<LoginPage />);
      const googleButton = screen.getByLabelText(/sign in with google/i);

      await user.click(googleButton);

      await waitFor(() => {
        expect(mockSignInWithPopup).toHaveBeenCalled();
      });
    });

    it('should update profile with role on Google sign in', async () => {
      const user = userEvent.setup();
      mockSignInWithPopup.mockResolvedValueOnce({
        user: { uid: '456', email: 'google@example.com' },
      });

      render(<LoginPage />);
      await user.click(screen.getByText('Volunteer'));
      const googleButton = screen.getByLabelText(/sign in with google/i);

      await user.click(googleButton);

      await waitFor(() => {
        expect(mockUpdateProfile).toHaveBeenCalledWith(expect.anything(), { displayName: 'Volunteer' });
      });
    });

    it('should store user data in Firestore on Google sign in', async () => {
      const user = userEvent.setup();
      mockSignInWithPopup.mockResolvedValueOnce({
        user: { uid: '456', email: 'google@example.com' },
      });

      render(<LoginPage />);
      const googleButton = screen.getByLabelText(/sign in with google/i);

      await user.click(googleButton);

      await waitFor(() => {
        expect(mockSetDoc).toHaveBeenCalled();
        const callArgs = mockSetDoc.mock.calls[0];
        expect(callArgs[1]).toEqual(expect.objectContaining({
          email: 'google@example.com',
          role: 'NGO Staff',
        }));
      });
    });
  });

  describe('Sign Up', () => {
    it('should call createUserWithEmailAndPassword on sign up', async () => {
      const user = userEvent.setup();
      mockCreateUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: '789', email: 'new@example.com' },
      });

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');

      await user.type(emailInput, 'new@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(screen.getByText(/sign up instead/i));

      await waitFor(() => {
        expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
          expect.anything(),
          'new@example.com',
          'password123'
        );
      });
    });

    it('should store user data in Firestore on sign up', async () => {
      const user = userEvent.setup();
      mockCreateUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: '789', email: 'new@example.com' },
      });

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      const passwordInput = screen.getByPlaceholderText('••••••••');

      await user.type(emailInput, 'new@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(screen.getByText(/sign up instead/i));

      await waitFor(() => {
        expect(mockSetDoc).toHaveBeenCalled();
        const callArgs = mockSetDoc.mock.calls[0];
        expect(callArgs[1]).toEqual(expect.objectContaining({
          email: 'new@example.com',
          role: 'NGO Staff',
        }));
      });
    });
  });

  describe('Password Reset', () => {
    it('should call sendPasswordResetEmail with email', async () => {
      const user = userEvent.setup();
      mockSendPasswordResetEmail.mockResolvedValueOnce();

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      await user.type(emailInput, 'test@example.com');

      const resetButton = screen.getByText(/reset/i);
      await user.click(resetButton);

      await waitFor(() => {
        expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(expect.anything(), 'test@example.com');
      });
    });

    it('should show reset message on successful password reset', async () => {
      const user = userEvent.setup();
      mockSendPasswordResetEmail.mockResolvedValueOnce();

      render(<LoginPage />);
      const emailInput = screen.getByPlaceholderText('name@organization.org');
      await user.type(emailInput, 'test@example.com');

      const resetButton = screen.getByText(/reset/i);
      await user.click(resetButton);

      await waitFor(() => {
        expect(screen.getByText(/password reset link sent/i)).toBeInTheDocument();
      });
    });

    it('should show error when resetting password without email', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);

      const resetButton = screen.getByText(/reset/i);
      await user.click(resetButton);

      expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle password visibility', async () => {
      const user = userEvent.setup();
      render(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText('••••••••');
      const toggleButton = screen.getByLabelText(/show password/i);

      expect(passwordInput).toHaveAttribute('type', 'password');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'text');

      await user.click(toggleButton);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });
});
