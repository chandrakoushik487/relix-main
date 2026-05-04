import { db } from '@/lib/firebase';
import { normalizeFirebaseError } from '@/lib/firebaseError';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp
} from 'firebase/firestore';

/**
 * Service to handle Task (Mission) operations in Firestore
 */
export const taskService = {
  /**
   * Fetches all tasks from Firestore
   */
  getTasks: async () => {
    try {
      const tasksRef = collection(db, 'tasks');
      const q = query(tasksRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt)
      }));
    } catch (error) {
      const normalized = normalizeFirebaseError(error, 'Unable to fetch tasks');
      console.error('Error fetching tasks:', normalized.details, error);
      throw new Error(normalized.details);
    }
  },

  /**
   * Creates a new mission/task
   */
  createTask: async (taskData) => {
    try {
      const tasksRef = collection(db, 'tasks');
      const docRef = await addDoc(tasksRef, {
        ...taskData,
        priority: taskData.priority || 'Medium',
        status: taskData.status || 'Pending',
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...taskData };
    } catch (error) {
      const normalized = normalizeFirebaseError(error, 'Unable to create task');
      console.error('Error creating task:', normalized.details, error);
      throw new Error(normalized.details);
    }
  },

  /**
   * Updates task status or progress
   */
  updateTask: async (taskId, updates) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      const normalized = normalizeFirebaseError(error, 'Unable to update task');
      console.error('Error updating task:', normalized.details, error);
      throw new Error(normalized.details);
    }
  }
};
