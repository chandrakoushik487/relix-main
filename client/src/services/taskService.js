import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  where
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
      console.error('Error fetching tasks:', error);
      throw error;
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
        status: taskData.status || 'Pending',
        progress: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: docRef.id, ...taskData };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
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
      console.error('Error updating task:', error);
      throw error;
    }
  }
};
