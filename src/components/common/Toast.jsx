// ============================================================================
// Zone4Flow - Notification Toast System
// ============================================================================

import React from 'react';
import { CheckCircleIcon, AlertTriangleIcon, SparklesIcon, XIcon } from './Icons';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircleIcon size={18} />,
    error: <AlertTriangleIcon size={18} />,
    info: <SparklesIcon size={18} />
  };

  const typeClass = `toast-${toast.type || 'info'}`;

  return (
    <div className="toast-container">
      <div className={`toast ${typeClass}`}>
        <span>{icons[toast.type] || icons.info}</span>
        <span>{toast.message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            cursor: 'pointer',
            marginLeft: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            opacity: 0.8
          }}
          aria-label="Cerrar notificación"
        >
          <XIcon size={14} />
        </button>
      </div>
    </div>
  );
}
