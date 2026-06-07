'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <section className="landing-hero">
        <h1 className="landing-title">
          Streamlined Healthcare,<br />
          <span style={{ color: 'var(--primary)' }}>Continuous Patient Care</span>
        </h1>
        <p className="landing-desc">
          A full-stack, secure, role-based medical coordinator. Book doctor appointments, 
          track continuous treatment checkups, manage prescription schedules, and receive alerts.
        </p>
        
        <div className="landing-actions">
          {user ? (
            <Link href={`/${user.role}`} className="btn btn-primary">
              Go to Your Dashboard ({user.role}) &rarr;
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary">
                Access Portal
              </Link>
              <Link href="/register" className="btn btn-secondary">
                Register as Patient
              </Link>
            </>
          )}
        </div>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Role-Based Security</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Fully secure authentication system utilizing JWT and bcrypt, with distinct dashboards for Admins, Doctors, and Patients.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Booking & Workflows</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Patients book appointments easily. Admin and Doctors confirm schedules, assign practitioners, and initiate cycles.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🩺</div>
          <h3>Continuous Treatment</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Monitor checkup logs (Blood Pressure, Weight, Pulse, Height) and follow-up schedules after appointment confirmation.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💊</div>
          <h3>Prescription Ledger</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Doctors input custom medication tables, frequencies, and durations. Patients review prescription history dynamically.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3>Notification Systems</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Simulate email reminders and mobile alert notifications for pill timers, checkup changes, and follow-up slots.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Clean Modern Interface</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            High-fidelity, responsive light theme using outfit typography, transitions, and glassmorphic dashboards.
          </p>
        </div>
      </div>

      <footer style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p>Air University Creative Technology Department &copy; Spring 2026 Final Term Project</p>
        <p style={{ marginTop: '0.25rem' }}>Developed for Full Stack Programming Lab (BSSE-VI A)</p>
      </footer>
    </div>
  );
}
