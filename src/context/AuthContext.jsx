// ============================================================================
// Zone4Flow - Authentication Context
// ============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize session from LocalStorage
  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  // Register a new user
  const register = (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = storage.getUsers();

    const existingUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existingUser) {
      return { success: false, error: 'Ya existe una cuenta registrada con este correo electrónico.' };
    }

    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name: name.trim(),
      email: trimmedEmail,
      password: password, // In production this would be hashed on a backend server
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    storage.saveUsers(updatedUsers);

    // Auto login upon registration
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    storage.setCurrentUser(sessionUser);
    setCurrentUser(sessionUser);

    return { success: true };
  };

  // Login existing user
  const login = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const users = storage.getUsers();

    const user = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Correo electrónico o contraseña incorrectos.' };
    }

    const sessionUser = { id: user.id, name: user.name, email: user.email };
    storage.setCurrentUser(sessionUser);
    setCurrentUser(sessionUser);

    return { success: true };
  };

  // Demo user login for immediate evaluation
  const loginAsDemo = () => {
    const demoEmail = 'demo@zone4flow.com';
    const users = storage.getUsers();
    let demoUser = users.find((u) => u.email === demoEmail);

    if (!demoUser) {
      demoUser = {
        id: 'demo-user-zone4flow',
        name: 'Usuario Demo',
        email: demoEmail,
        password: 'demoPassword123!',
        createdAt: new Date().toISOString()
      };
      storage.saveUsers([...users, demoUser]);
    }

    const sessionUser = { id: demoUser.id, name: demoUser.name, email: demoUser.email };
    storage.setCurrentUser(sessionUser);
    setCurrentUser(sessionUser);

    return { success: true };
  };

  // Logout
  const logout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    loginAsDemo,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
