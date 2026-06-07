'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '../../utils/api';

export default function PatientDashboard() {
  const { user, loading, addToast, notifications, fetchNotifications } = useAuth();
  const router = useRouter();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Backend records lists
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  // Appointment booking form state
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [apptDate, setApptDate] = useState('');
  const [apptTimeSlot, setApptTimeSlot] = useState('09:00 AM');
  const [apptSymptoms, setApptSymptoms] = useState('');
  const [booking, setBooking] = useState(false);

  // Simulated Mobile Alert HUD State
  const [simAlertTitle, setSimAlertTitle] = useState('Pill Reminder');
  const [simAlertBody, setSimAlertBody] = useState('Time to take Amlodipine (5mg) - Once daily (morning).');
  const [simulating, setSimulating] = useState(false);

  // Auth protection check
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'patient') {
        router.push(`/${user.role}`);
      } else {
        fetchPatientData();
      }
    }
  }, [user, loading, router]);

  const fetchPatientData = async () => {
    try {
      const doctorsData = await api.get('/doctors');
      setDoctors(doctorsData);

      const apptData = await api.get('/appointments');
      setAppointments(apptData);

      const treatmentsData = await api.get('/treatments');
      setTreatments(treatmentsData);

      const prescriptionData = await api.get('/prescriptions');
      setPrescriptions(prescriptionData);
    } catch (err) {
      console.error(err);
      addToast('Failed to load health records', 'error');
    }
  };

  // Submit appointment booking
  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!selectedDoctorId || !apptDate || !apptTimeSlot || !apptSymptoms) {
      addToast('Please fill in all appointment booking fields', 'error');
      return;
    }

    setBooking(true);
    try {
      await api.post('/appointments', {
        doctorId: selectedDoctorId,
        date: apptDate,
        timeSlot: apptTimeSlot,
        symptoms: apptSymptoms
      });
      addToast('Appointment requested successfully! Awaiting medical approval.');
      // Reset form
      setSelectedDoctorId('');
      setApptDate('');
      setApptSymptoms('');
      setActiveTab('appointments');
      fetchPatientData();
      fetchNotifications(); // Update navbar alerts bell
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setBooking(false);
    }
  };

  // Trigger simulated pill/mobile alert
  const handleSimulateAlert = async () => {
    setSimulating(true);
    try {
      await api.post('/notifications/simulate', {
        title: simAlertTitle,
        message: simAlertBody,
        type: 'medication'
      });
      addToast(`Simulated notification dispatched: "${simAlertTitle}"`);
      fetchNotifications(); // Reload notifications drawer
    } catch (err) {
      addToast('Failed to simulate notification', 'error');
    } finally {
      setSimulating(false);
    }
  };

  if (loading || !user || user.role !== 'patient') {
    return <div className="container"><p>Authenticating patient profile...</p></div>;
  }

  const patientProfile = user.profile || {};
  const activeTreatment = treatments.find(t => t.status === 'active');
  const medicationAlerts = notifications.filter(n => n.type === 'medication');

  return (
    <div className="container">
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'Outfit' }}>Health Center</h3>
          <ul className="sidebar-menu">
            <li 
              className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              👤 My Health Profile
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'book' ? 'active' : ''}`}
              onClick={() => setActiveTab('book')}
            >
              ➕ Book Appointment
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              📅 Appointment History
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'treatment' ? 'active' : ''}`}
              onClick={() => setActiveTab('treatment')}
            >
              🩺 Clinical Care Logs
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
              onClick={() => setActiveTab('prescriptions')}
            >
              💊 My Prescriptions
            </li>
          </ul>
        </aside>

        {/* Main Panel */}
        <main className="dashboard-main">
          {/* Header Row */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit' }}>Patient Health Dashboard</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}. Book consultations, view prescription intake, and track checkup vitals.</p>
          </div>

          {/* Tab 1: Overview & Profile */}
          {activeTab === 'overview' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="card">
                  <h3 style={{ marginBottom: '1rem' }}>📋 Demographics Info</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Age</span>
                      <strong>{patientProfile.age || 'N/A'} years</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Gender</span>
                      <strong>{patientProfile.gender || 'N/A'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Blood Group</span>
                      <span className="badge badge-active">{patientProfile.bloodType || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Phone</span>
                      <strong>{patientProfile.phone || 'N/A'}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.4rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Address</span>
                      <strong style={{ maxWidth: '200px', textAlign: 'right', fontSize: '0.85rem' }}>{patientProfile.address || 'N/A'}</strong>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 style={{ marginBottom: '1rem' }}>🩺 Medical Supervision</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Assigned Practitioner</span>
                      {patientProfile.assignedDoctor ? (
                        <div style={{ padding: '0.75rem', background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-md)' }}>
                          <strong>Dr. {patientProfile.assignedDoctor.user?.name}</strong> <br />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{patientProfile.assignedDoctor.specialization}</span>
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No doctor assigned yet. Request a slot to enter medical cycle.</span>
                      )}
                    </div>

                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>Medical History / Conditions</span>
                      {patientProfile.medicalHistory?.length > 0 ? (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {patientProfile.medicalHistory.map((item, idx) => (
                            <span key={idx} className="badge badge-pending">{item}</span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No historical conditions logged.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification & Alerts Simulation HUD */}
              <div className="mobile-alert-sim-hud">
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>📱 Simulated Alert System (Email / Mobile Simulation)</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  The requirements dictate dispatching notifications on appointment approvals, medication updates, and follow-ups.
                  Use the control panel below to dispatch a simulated real-time alert and observe how it registers in your notifications.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end', background: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <div className="form-group" style={{ flex: '1', minWidth: '150px', margin: '0' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Alert Title</label>
                    <input type="text" className="form-input" style={{ padding: '0.4rem' }} value={simAlertTitle} onChange={(e) => setSimAlertTitle(e.target.value)} />
                  </div>
                  <div className="form-group" style={{ flex: '2', minWidth: '250px', margin: '0' }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Alert Message Body</label>
                    <input type="text" className="form-input" style={{ padding: '0.4rem' }} value={simAlertBody} onChange={(e) => setSimAlertBody(e.target.value)} />
                  </div>
                  <button onClick={handleSimulateAlert} className="btn btn-primary btn-sm" style={{ padding: '0.55rem 1rem' }} disabled={simulating}>
                    {simulating ? 'Sending...' : 'Trigger Mobile Alert'}
                  </button>
                </div>

                {/* Simulated Smartphone Preview HUD */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Smartphone simulated alert preview:</span>
                  <div className="mobile-alert-box">
                    <div className="mobile-alert-header">
                      <span>🔔 MEDICAL ALERT</span>
                      <span>Now</span>
                    </div>
                    <div className="mobile-alert-title">{simAlertTitle}</div>
                    <div className="mobile-alert-body">{simAlertBody}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Tab 2: Book Appointment */}
          {activeTab === 'book' && (
            <div className="card" style={{ maxWidth: '600px' }}>
              <h3 style={{ marginBottom: '1rem' }}>📅 Book a Consultation</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select a consultant doctor and slot date. Once confirmed, you will be assigned to this practitioner and enter a supervised treatment cycle.
              </p>

              <form onSubmit={handleBookAppointment}>
                <div className="form-group">
                  <label className="form-label" htmlFor="doctorSelect">Select Practitioner / Specialty</label>
                  <select 
                    id="doctorSelect" 
                    className="form-select"
                    value={selectedDoctorId} 
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Doctor --</option>
                    {doctors.map(d => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.user?.name} ({d.specialization}) - {d.experience} Years Exp.
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="apptDate">Date</label>
                    <input 
                      type="date" 
                      id="apptDate" 
                      className="form-input" 
                      value={apptDate} 
                      onChange={(e) => setApptDate(e.target.value)}
                      required 
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="timeSlot">Time Slot</label>
                    <select 
                      id="timeSlot" 
                      className="form-select"
                      value={apptTimeSlot} 
                      onChange={(e) => setApptTimeSlot(e.target.value)}
                    >
                      {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                  <label className="form-label" htmlFor="symptoms">Describe Symptoms / Reasons for Visit</label>
                  <textarea 
                    id="symptoms" 
                    className="form-input" 
                    style={{ minHeight: '100px', resize: 'vertical' }}
                    placeholder="Describe how you feel, e.g. severe headaches, high blood pressure readings..."
                    value={apptSymptoms}
                    onChange={(e) => setApptSymptoms(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={booking}
                >
                  {booking ? 'Requesting Appointment...' : 'Submit Booking Request'}
                </button>
              </form>
            </div>
          )}

          {/* Tab 3: Appointment History */}
          {activeTab === 'appointments' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>📅 Your Appointment Requests</h3>
              {appointments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>You have no appointment bookings on record.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Doctor</th>
                        <th>Specialty</th>
                        <th>Date & Time</th>
                        <th>Symptoms</th>
                        <th>Status</th>
                        <th>Doctor Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appt) => (
                        <tr key={appt._id}>
                          <td><strong>Dr. {appt.doctor?.user?.name}</strong></td>
                          <td><span className="badge badge-active">{appt.doctor?.specialization}</span></td>
                          <td>
                            {new Date(appt.date).toLocaleDateString()} <br />
                            <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{appt.timeSlot}</span>
                          </td>
                          <td><p style={{ fontSize: '0.85rem', maxWidth: '200px' }}>{appt.symptoms}</p></td>
                          <td><span className={`badge badge-${appt.status}`}>{appt.status}</span></td>
                          <td><span style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>{appt.comments || 'No comment logged.'}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Treatments & Checkups Log */}
          {activeTab === 'treatment' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>🩺 Continuous Treatment Cycles & Checkups</h3>
              {treatments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No active treatment cycles initialized. Confirmed appointments initialize a cycle.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {treatments.map((treat) => (
                    <div key={treat._id} className="clinical-record-card" style={{ borderLeft: '4px solid var(--primary)', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.15rem' }}>Consultant: Dr. {treat.doctor?.user?.name} ({treat.doctor?.specialization})</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Diagnosed Condition: <strong style={{ color: 'var(--primary)' }}>{treat.diagnosis}</strong>
                          </span>
                        </div>
                        <span className={`badge badge-${treat.status}`}>{treat.status}</span>
                      </div>

                      {/* Physical Vitals checkup tables */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Physical Examination Logs (BP, Pulse, Weight, Height)</h5>
                        {treat.checkups?.length === 0 ? (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No physical checkup vitals logged yet by your doctor.</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {treat.checkups.map((ck, idx) => (
                              <div key={idx} style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                  <span>Logged: {new Date(ck.date).toLocaleDateString()}</span>
                                  <strong>Vitals Log #{idx + 1}</strong>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '500' }}>
                                  <span>Blood Pressure: <strong style={{ color: 'var(--primary)' }}>{ck.bloodPressure || 'N/A'}</strong></span>
                                  <span>Heart Rate: <strong>{ck.pulse || 'N/A'} bpm</strong></span>
                                  <span>Weight: <strong>{ck.weight || 'N/A'} kg</strong></span>
                                  <span>Height: <strong>{ck.height || 'N/A'} cm</strong></span>
                                </div>
                                {ck.notes && <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>Doctor Remarks: {ck.notes}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Scheduled Follow-ups */}
                      <div>
                        <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Scheduled Follow-up Visits</h5>
                        {treat.followUps?.length === 0 ? (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No follow-up dates scheduled.</p>
                        ) : (
                          <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {treat.followUps.map((fl, idx) => (
                              <li key={idx} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', padding: '0.4rem', background: '#fafafa', borderLeft: '3px solid var(--warning)', borderRadius: '4px' }}>
                                <span>📅 {new Date(fl.date).toLocaleDateString()} - Reason: {fl.notes}</span>
                                <span className={`badge badge-${fl.status}`} style={{ fontSize: '0.7rem' }}>{fl.status}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Prescriptions */}
          {activeTab === 'prescriptions' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>💊 Your Prescribed Medications Cabinet</h3>
              {prescriptions.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No digital prescriptions found.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {prescriptions.map((pr) => (
                    <div key={pr._id} className="clinical-record-card" style={{ borderTop: '3px solid var(--success)', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.5rem' }}>
                        <span>Issued by: <strong>Dr. {pr.doctor?.user?.name}</strong></span>
                        <span>Date: {new Date(pr.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div style={{ marginBottom: '1rem' }}>
                        <table className="data-table" style={{ border: 'none' }}>
                          <thead>
                            <tr style={{ background: 'none' }}>
                              <th style={{ background: 'none', padding: '0.5rem 0' }}>Medicine</th>
                              <th style={{ background: 'none', padding: '0.5rem 0' }}>Dosage</th>
                              <th style={{ background: 'none', padding: '0.5rem 0' }}>Frequency</th>
                              <th style={{ background: 'none', padding: '0.5rem 0' }}>Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pr.medications?.map((med, idx) => (
                              <tr key={idx}>
                                <td style={{ padding: '0.5rem 0' }}><strong>{med.name}</strong></td>
                                <td style={{ padding: '0.5rem 0' }}>{med.dosage}</td>
                                <td style={{ padding: '0.5rem 0' }}><span className="badge badge-active">{med.frequency}</span></td>
                                <td style={{ padding: '0.5rem 0' }}>{med.duration}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {pr.instructions && (
                        <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                          ℹ️ <strong>Instructions:</strong> {pr.instructions}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
