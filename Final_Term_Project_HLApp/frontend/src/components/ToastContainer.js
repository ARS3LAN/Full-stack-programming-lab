'use client';

import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useAuth();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}
        >
          <div className="toast-content">
            {toast.type === 'error' ? '❌ ' : '✅ '}
            {toast.message}
          </div>
          <button onClick={() => removeToast(toast.id)} className="toast-close">
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
