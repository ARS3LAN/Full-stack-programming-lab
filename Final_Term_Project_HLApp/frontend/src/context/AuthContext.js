'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Add a toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load user profile on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.get('/auth/profile');
        setUser(data);
        fetchNotifications();
      } catch (err) {
        console.warn('Failed to load profile (token may be stale):', err.message);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Fetch user notifications
  const fetchNotifications = async () => {
    try {
      const data = await api.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  // Mark a notification as read
  const markNotificationRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Mark all notifications as read
  const markAllNotificationsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      addToast('All notifications marked as read');
    } catch (err) {
      console.error(err);
    }
  };

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      
      // Load full profile details immediately
      const profile = await api.get('/auth/profile');
      setUser(profile);
      
      // Load notifications
      const notifs = await api.get('/notifications');
      setNotifications(notifs);
      
      addToast(`Welcome back, ${profile.name}!`);
      return profile;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (name, email, password, role = 'patient', extraInfo = {}) => {
    setLoading(true);
    try {
      const data = await api.post('/auth/register', { name, email, password, role, extraInfo });
      localStorage.setItem('token', data.token);
      
      // Load full profile
      const profile = await api.get('/auth/profile');
      setUser(profile);
      
      addToast('Account registered successfully!');
      return profile;
    } catch (err) {
      addToast(err.message || 'Registration failed', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setNotifications([]);
    addToast('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        notifications,
        toasts,
        addToast,
        removeToast,
        login,
        register,
        logout,
        fetchNotifications,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
