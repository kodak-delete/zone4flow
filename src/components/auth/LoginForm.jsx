// ============================================================================
// Zone4Flow - User Login Form Component
// ============================================================================

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MailIcon, LockIcon, LogOutIcon, SparklesIcon } from '../common/Icons';

export default function LoginForm({ onSwitchToRegister }) {
  const { login, loginAsDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.error);
    }
  };

  const handleDemoLogin = () => {
    setError('');
    loginAsDemo();
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
        <label className="form-label" htmlFor="login-email">
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
            id="login-email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label" htmlFor="login-password">
          Contraseña <span className="form-label-required">*</span>
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
            id="login-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <LogOutIcon size={18} style={{ transform: 'rotate(180deg)' }} />
        {submitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <div className="auth-demo-box">
        <p className="auth-demo-text">¿Quieres probar la aplicación de inmediato?</p>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem' }}
        >
          <SparklesIcon size={16} style={{ color: '#8b5cf6' }} />
          Acceder con Usuario de Demostración
        </button>
      </div>
    </form>
  );
}
