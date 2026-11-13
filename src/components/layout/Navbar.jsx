// ============================================================================
// Zone4Flow - Navigation Bar Component
// ============================================================================

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PlusIcon, LogOutIcon } from '../common/Icons';

export default function Navbar({ onOpenNewTaskModal }) {
  const { currentUser, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>
              Zone4Flow
              <span className="brand-tag">React</span>
            </h1>
          </div>
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenNewTaskModal}
            aria-label="Crear nueva tarea"
          >
            <PlusIcon size={18} />
            <span>Nueva Tarea</span>
          </button>

          {currentUser && (
            <div className="user-profile-badge">
              <div className="avatar-circle">
                {getInitials(currentUser.name)}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-email">{currentUser.email}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={logout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogOutIcon size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
