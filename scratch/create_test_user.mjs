import admin from 'firebase-admin';

admin.initializeApp();

async function createTestUser() {
  try {
    const userRecord = await admin.auth().createUser({
      email: 'test@relix.org',
      emailVerified: true,
      password: 'password123',
      displayName: 'Test NGO Staff',
      disabled: false,
    });
    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    console.log('Error creating new user:', error.message);
  }
}

createTestUser();
