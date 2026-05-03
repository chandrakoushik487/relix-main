/**
 * User Service - Handles Firestore user profile operations
 * Uses Firebase v9 modular syntax and strict field structure
 */

import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const getCurrentUserRef = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('USER_NOT_AUTHENTICATED');
  }

  const uid = currentUser.uid;
  const userDocRef = doc(db, 'users', uid);
  return { currentUser, uid, userDocRef };
};

const ensureValidPhone = (phone) => {
  const normalized = (phone || '').trim();
  if (!normalized) {
    return true;
  }
  const phoneRegex = /^\+?[0-9\s\-().]{7,25}$/;
  return phoneRegex.test(normalized);
};

export const fetchUserProfile = async () => {
  try {
    const { currentUser, uid, userDocRef } = getCurrentUserRef();
    const snapshot = await getDoc(userDocRef);

    if (!snapshot.exists()) {
      throw new Error('USER_DOCUMENT_NOT_FOUND');
    }

    if (snapshot.id !== uid) {
      throw new Error('USER_UID_MISMATCH');
    }

    const data = snapshot.data();

    return {
      uid,
      email: currentUser.email || data.email || '',
      username: data.username || currentUser.displayName || currentUser.email?.split('@')[0] || '',
      phone: data.phone ?? '',
      bio: data.bio ?? '',
      createdAt: data.createdAt ?? data.created_at ?? null,
      updatedAt: data.updatedAt ?? data.updated_at ?? null,
      ...data,
    };
  } catch (error) {
    if (error.message.startsWith('USER_')) {
      throw error;
    }
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
};

export const createUserDocument = async (userData = {}) => {
  try {
    const { currentUser, userDocRef } = getCurrentUserRef();

    const docData = {
      email: currentUser.email || '',
      username: userData.username?.trim() || currentUser.displayName || currentUser.email?.split('@')[0] || '',
      phone: userData.phone?.trim() || '',
      bio: userData.bio?.trim() || '',
      role: userData.role || 'NGO Staff', // Default role if not provided
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // If there's an existing document, we might want to preserve the role if it's already there
    await setDoc(userDocRef, docData, { merge: true });
  } catch (error) {
    throw new Error(`Failed to create user document: ${error.message}`);
  }
};

export const updateUserProfile = async (updates = {}) => {
  try {
    const { userDocRef } = getCurrentUserRef();
    const safeUpdates = {};

    // Map of fields to validate/sanitize
    const stringFields = ['username', 'phone', 'bio', 'language', 'role', 'avatarUrl'];
    
    stringFields.forEach(field => {
      if (typeof updates[field] === 'string') {
        const val = updates[field].trim();
        if (field === 'username' && !val) {
          throw new Error('INVALID_USERNAME');
        }
        if (field === 'phone' && val && !ensureValidPhone(val)) {
          throw new Error('INVALID_PHONE');
        }
        safeUpdates[field] = val;
      }
    });

    if (Object.keys(safeUpdates).length === 0) {
      throw new Error('NO_PROFILE_FIELDS');
    }

    safeUpdates.updatedAt = serverTimestamp();

    const snapshot = await getDoc(userDocRef);
    if (!snapshot.exists()) {
      throw new Error('USER_DOCUMENT_NOT_FOUND');
    }

    await updateDoc(userDocRef, safeUpdates);
  } catch (error) {
    if (error.message.startsWith('USER_') || error.message.startsWith('INVALID_') || error.message === 'NO_PROFILE_FIELDS') {
      throw error;
    }
    throw new Error(`Failed to update user profile: ${error.message}`);
  }
};

export const saveUserProfile = async (userData = {}) => {
  try {
    const { userDocRef } = getCurrentUserRef();
    const snapshot = await getDoc(userDocRef);
    
    if (!snapshot.exists()) {
      await createUserDocument(userData);
    } else {
      await updateUserProfile(userData);
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUserDocument = async () => {
  try {
    const { userDocRef } = getCurrentUserRef();
    await deleteDoc(userDocRef);
  } catch (error) {
    throw new Error(`Failed to delete user profile document: ${error.message}`);
  }
};
