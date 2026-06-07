'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, notifications, markNotificationRead, markAllNotificationsRead } = useAuth();
  const [showNotifDrawer, setShowNotifDrawer] = useState(false);
  const router = useRouter();
  const drawerRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Close drawer when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setShowNotifDrawer(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-wrapper">
      <Link href="/" className="navbar-brand">
        🏥 HL<span>App</span>
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Logged in: <strong>{user.name}</strong>
            </span>
            <span className="user-badge">{user.role}</span>

            {/* Dashboard Link based on role */}
            <Link href={`/${user.role}`} className="navbar-link">
              Dashboard
            </Link>

            {/* Notification Bell */}
            <div className="notification-bell-container" ref={drawerRef}>
              <div 
                onClick={() => setShowNotifDrawer(!showNotifDrawer)}
                style={{ fontSize: '1.25rem', position: 'relative', userSelect: 'none' }}
              >
                🔔
                {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
              </div>

              {/* Notification Dropdown Drawer */}
              {showNotifDrawer && (
                <div className="notification-drawer">
                  <div className="notification-header">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllNotificationsRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`notification-item ${!notif.isRead ? 'unread' : ''}`}
                          onClick={() => {
                            if (!notif.isRead) markNotificationRead(notif._id);
                          }}
                        >
                          <div className="notification-item-title">
                            <span>
                              {notif.type === 'appointment' && '📅'}
                              {notif.type === 'medication' && '💊'}
                              {notif.type === 'followup' && '🗓️'}
                              {notif.type === 'system' && '⚙️'}
                              {' '}{notif.title}
                            </span>
                            {!notif.isRead && (
                              <span style={{
                                width: '6px',
                                height: '6px',
                                backgroundColor: 'var(--primary)',
                                borderRadius: '50%'
                              }} />
                            )}
                          </div>
                          <div className="notification-item-desc">{notif.message}</div>
                          <div className="notification-time">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(notif.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="navbar-link">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Register as Patient
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
