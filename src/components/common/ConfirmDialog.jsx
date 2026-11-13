// ============================================================================
// Zone4Flow - Confirmation Dialog Component
// ============================================================================

import React from 'react';
import Modal from './Modal';
import { AlertTriangleIcon, TrashIcon } from './Icons';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Confirmar eliminación?',
  message = 'Esta acción eliminará permanentemente la tarea seleccionada y no se puede deshacer.',
  confirmText = 'Eliminar tarea'
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="460px">
      <div className="modal-body" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
        <div 
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.15)',
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}
        >
          <AlertTriangleIcon size={28} />
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          {message}
        </p>
      </div>
      <div className="modal-footer" style={{ justifyContent: 'center' }}>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          <TrashIcon size={16} />
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
