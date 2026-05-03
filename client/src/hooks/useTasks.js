'use client';
import { useState, useEffect, useCallback } from 'react';
import { taskService } from '@/services/taskService';
import { db } from '@/lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';

/**
 * Hook to manage tasks/missions with real-time support
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initial fetch and Real-time listener
  useEffect(() => {
    let unsubscribe = null;
    
    try {
      setLoading(true);
      
      // Simple query without orderBy to avoid composite index errors
      const q = query(collection(db, 'tasks'));
      
      unsubscribe = onSnapshot(q, (snapshot) => {
        try {
          const taskList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          // Sort on client side to avoid index requirements
          taskList.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || new Date(a.createdAt).getTime();
            const bTime = b.createdAt?.toMillis?.() || new Date(b.createdAt).getTime();
            return bTime - aTime;
          });
          setTasks(taskList);
          setLoading(false);
          setError(null);
        } catch (innerErr) {
          console.error('Error processing snapshot:', innerErr);
          setError(innerErr.message);
          setLoading(false);
        }
      }, (err) => {
        console.error('Firestore listener error:', err);
        setError(err.message);
        setLoading(false);
        // Fallback to empty array on error
        setTasks([]);
      });
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(err.message);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask: taskService.createTask,
    updateTask: taskService.updateTask
  };
}
