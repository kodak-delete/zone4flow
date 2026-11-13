// ============================================================================
// Zone4Flow - Main Application Component
// ============================================================================

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import AuthPage from './components/auth/AuthPage';
import Navbar from './components/layout/Navbar';
import StatsOverview from './components/layout/StatsOverview';
import TaskFilterBar from './components/tasks/TaskFilterBar';
import TaskBoardView from './components/tasks/TaskBoardView';
import TaskListView from './components/tasks/TaskListView';
import TaskFormModal from './components/tasks/TaskFormModal';
import EmptyTasksState from './components/tasks/EmptyTasksState';
import ConfirmDialog from './components/common/ConfirmDialog';
import Toast from './components/common/Toast';
import './App.css';

function MainDashboard() {
  const { filteredTasks, viewMode, deleteTask, toast, closeToast } = useTasks();

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Handlers
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
    setTaskToEdit(null);
  };

  const handleRequestDelete = (task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="app-wrapper">
      <Navbar onOpenNewTaskModal={handleOpenCreateModal} />

      <main className="main-content">
        <div className="container">
          {/* Key Metrics Overview */}
          <StatsOverview />

          {/* Search, Filter & View Controls */}
          <TaskFilterBar />

          {/* Task Board / List Display */}
          {filteredTasks.length === 0 ? (
            <EmptyTasksState onOpenNewTaskModal={handleOpenCreateModal} />
          ) : viewMode === 'board' ? (
            <TaskBoardView
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleRequestDelete}
            />
          ) : (
            <TaskListView
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleRequestDelete}
            />
          )}
        </div>
      </main>

      {/* Task Create / Edit Modal */}
      <TaskFormModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(taskToDelete)}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar esta tarea?"
        message={
          taskToDelete
            ? `¿Estás seguro de que deseas eliminar la tarea "${taskToDelete.title}"? Esta acción no se puede deshacer.`
            : ''
        }
      />

      {/* Toast Alert System */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}

function AppContent() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div 
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-muted)'
        }}
      >
        <p>Cargando Zone4Flow...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <TaskProvider>
      <MainDashboard />
    </TaskProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
