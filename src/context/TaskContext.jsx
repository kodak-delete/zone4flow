// ============================================================================
// Zone4Flow - Task Management Context
// ============================================================================

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { storage } from '../utils/storage';
import { getInitialDemoTasks } from '../utils/sampleData';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate-asc');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'
  const [toast, setToast] = useState(null);

  // Show auto-dismissing toast notifications
  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const closeToast = useCallback(() => {
    setToast(null);
  }, []);

  // Load user-isolated tasks upon user session change
  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      return;
    }

    const savedTasks = storage.getTasksForUser(currentUser.id);
    if (savedTasks === null) {
      // First time user initialization with sample data
      const initial = getInitialDemoTasks();
      storage.saveTasksForUser(currentUser.id, initial);
      setTasks(initial);
    } else {
      setTasks(savedTasks);
    }
  }, [currentUser]);

  // Persist tasks to LocalStorage whenever tasks state changes
  const persistTasks = useCallback((newTasks) => {
    if (!currentUser) return;
    setTasks(newTasks);
    storage.saveTasksForUser(currentUser.id, newTasks);
  }, [currentUser]);

  // --- CRUD ACTIONS ---

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      title: taskData.title.trim(),
      description: taskData.description ? taskData.description.trim() : '',
      priority: taskData.priority || 'media',
      status: taskData.status || 'pending',
      dueDate: taskData.dueDate || '',
      category: taskData.category ? taskData.category.trim() : 'General',
      createdAt: new Date().toISOString()
    };

    const updated = [newTask, ...tasks];
    persistTasks(updated);
    showToast('¡Tarea creada exitosamente!', 'success');
    return newTask;
  }, [tasks, persistTasks, showToast]);

  const updateTask = useCallback((taskId, updatedFields) => {
    const updated = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
      }
      return task;
    });

    persistTasks(updated);
    showToast('Tarea actualizada correctamente.', 'info');
  }, [tasks, persistTasks, showToast]);

  const deleteTask = useCallback((taskId) => {
    const updated = tasks.filter((task) => task.id !== taskId);
    persistTasks(updated);
    showToast('Tarea eliminada.', 'error');
  }, [tasks, persistTasks, showToast]);

  const toggleTaskComplete = useCallback((taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    
    persistTasks(updated);
    if (newStatus === 'completed') {
      showToast('¡Excelente! Tarea marcada como completada.', 'success');
    } else {
      showToast('Tarea reabierta como pendiente.', 'info');
    }
  }, [tasks, persistTasks, showToast]);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    persistTasks(updated);
  }, [tasks, persistTasks]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setSortBy('dueDate-asc');
  }, []);

  // --- STATS OVERVIEW ---
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      completionRate
    };
  }, [tasks]);

  // --- FILTERED & SORTED TASKS ---
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query filter (matches title or description)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = task.description ? task.description.toLowerCase().includes(query) : false;
          const matchCat = task.category ? task.category.toLowerCase().includes(query) : false;
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        // Status filter
        if (statusFilter !== 'all' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate-asc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'dueDate-desc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);
        }
        if (sortBy === 'priority-desc') {
          const priorityWeight = { alta: 3, media: 2, baja: 1 };
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, priorityFilter, sortBy]);

  const value = {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    clearFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    updateTaskStatus,
    toast,
    showToast,
    closeToast
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe ser utilizado dentro de un TaskProvider');
  }
  return context;
}
