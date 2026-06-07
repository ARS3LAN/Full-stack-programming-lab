'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push(`/${user.role}`);
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Please enter your credentials to access the healthcare portal</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="e.g. doctor1@hlapp.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Don't have a patient account?{' '}
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
            Register here
          </Link>
        </div>

        {/* Quick Credentials Help */}
        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>🔑 Quick Access Accounts (Seeded):</p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'var(--text-secondary)' }}>
            <li><strong>Admin:</strong> admin@hlapp.com (pass: admin123)</li>
            <li><strong>Doctor:</strong> doctor1@hlapp.com (pass: doctor123)</li>
            <li><strong>Patient:</strong> patient1@hlapp.com (pass: patient123)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
