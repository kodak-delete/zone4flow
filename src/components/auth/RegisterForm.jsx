// ============================================================================
// Zone4Flow - User Registration Form Component
// ============================================================================

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserIcon, MailIcon, LockIcon, PlusIcon } from '../common/Icons';

export default function RegisterForm({ onSwitchToLogin }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (name.trim().length < 2) {
      setError('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setSubmitting(true);
    const result = register(name, email, password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in" noValidate>
      {error && (
        <div 
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.88rem',
            marginBottom: '1.25rem'
          }}
        >
          {error}
        </div>
      )}

      <div className="form-group" style={{ marginBottom: '1.15rem' }}>
        <label className="form-label" htmlFor="reg-name">
          Nombre Completo <span className="form-label-required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <span 
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <UserIcon size={18} />
          </span>
          <input
            id="reg-name"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '1.15rem' }}>
        <label className="form-label" htmlFor="reg-email">
          Correo Electrónico <span className="form-label-required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <span 
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <MailIcon size={18} />
          </span>
          <input
            id="reg-email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '1.15rem' }}>
        <label className="form-label" htmlFor="reg-pass">
          Contraseña (mínimo 6 caracteres) <span className="form-label-required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <span 
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <LockIcon size={18} />
          </span>
          <input
            id="reg-pass"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label" htmlFor="reg-pass-confirm">
          Confirmar Contraseña <span className="form-label-required">*</span>
        </label>
        <div style={{ position: 'relative' }}>
          <span 
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-dim)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <LockIcon size={18} />
          </span>
          <input
            id="reg-pass-confirm"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
            required
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        style={{ width: '100%', padding: '0.8rem' }}
        disabled={submitting}
      >
        <PlusIcon size={18} />
        {submitting ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>

      <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ¿Ya tienes una cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#818cf8',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </form>
  );
}
