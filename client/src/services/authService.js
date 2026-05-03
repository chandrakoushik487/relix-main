/**
 * Auth Service - Handles Firebase Authentication operations
 * Uses Firebase v9 modular SDK and async/await
 */

import { auth, db } from '@/lib/firebase';
import { deleteUser, updatePassword } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';

const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('USER_NOT_AUTHENTICATED');
  }
  return currentUser;
};

export const changeUserPassword = async (newPassword) => {
  try {
    const currentUser = getCurrentUser();
    if (newPassword.length < 8) {
      throw new Error('PASSWORD_TOO_SHORT');
    }

    await updatePassword(currentUser, newPassword);
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      throw new Error('AUTH_REAUTH_REQUIRED');
    }
    throw new Error(`Failed to change password: ${error.message}`);
  }
};

export const deleteUserAccount = async () => {
  try {
    const currentUser = getCurrentUser();
    const uid = currentUser.uid;

    await deleteUser(currentUser);

    try {
      await deleteDoc(doc(db, 'users', uid));
    } catch (docError) {
      console.warn('User account deleted but Firestore document removal failed:', docError.message);
    }
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      throw new Error('AUTH_REAUTH_REQUIRED');
    }
    throw new Error(`Failed to delete account: ${error.message}`);
  }
};
