'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '../../utils/api';

export default function DoctorDashboard() {
  const { user, loading, addToast } = useAuth();
  const router = useRouter();

  // Navigation tab
  const [activeTab, setActiveTab] = useState('patients');

  // Backend data lists
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [treatments, setTreatments] = useState([]);

  // Detail/Action Modal toggles
  const [activeTreatmentId, setActiveTreatmentId] = useState(null);
  const [showCheckupModal, setShowCheckupModal] = useState(false);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Vitals form state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [pulse, setPulse] = useState('');
  const [checkupNotes, setCheckupNotes] = useState('');

  // Diagnosis edit state
  const [diagText, setDiagText] = useState('');
  const [updatingDiagId, setUpdatingDiagId] = useState(null);

  // Follow-up form state
  const [followupDate, setFollowupDate] = useState('');
  const [followupNotes, setFollowupNotes] = useState('');

  // Prescription form state
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [medsList, setMedsList] = useState([{ name: '', dosage: '', frequency: 'Twice a day', duration: '7 days' }]);

  // Auth protection check
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'doctor') {
        router.push(`/${user.role}`);
      } else {
        fetchDoctorData();
      }
    }
  }, [user, loading, router]);

  const fetchDoctorData = async () => {
    try {
      // Patients list (all, which we filter locally by assignedDoctor or display all patients)
      const patientsData = await api.get('/patients');
      setPatients(patientsData);
      
      const apptData = await api.get('/appointments');
      setAppointments(apptData);

      const treatmentsData = await api.get('/treatments');
      setTreatments(treatmentsData);
    } catch (err) {
      console.error(err);
      addToast('Failed to load clinic records', 'error');
    }
  };

  // Filter lists to only represent items belonging to THIS doctor
  const myDoctorProfile = user?.profile || {};
  const myPatients = patients.filter(p => p.assignedDoctor && p.assignedDoctor._id === myDoctorProfile._id);
  const myAppointments = appointments.filter(a => a.doctor && a.doctor._id === myDoctorProfile._id);
  const myTreatments = treatments.filter(t => t.doctor && t.doctor._id === myDoctorProfile._id);

  // Handle confirm/reject appointment
  const handleApptAction = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      addToast(`Appointment has been ${status}`);
      fetchDoctorData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Add Vitals Checkup
  const handleAddCheckup = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/treatments/${activeTreatmentId}/checkup`, {
        weight: parseFloat(weight),
        height: parseFloat(height),
        bloodPressure,
        pulse: parseInt(pulse),
        notes: checkupNotes
      });
      addToast('Physical checkup logged successfully!');
      // Clear forms
      setWeight('');
      setHeight('');
      setBloodPressure('');
      setPulse('');
      setCheckupNotes('');
      setShowCheckupModal(false);
      fetchDoctorData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Schedule Follow-Up
  const handleAddFollowup = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/treatments/${activeTreatmentId}/followup`, {
        date: followupDate,
        notes: followupNotes
      });
      addToast('Follow-up schedule saved');
      setFollowupDate('');
      setFollowupNotes('');
      setShowFollowupModal(false);
      fetchDoctorData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Update Diagnosis/Treatment status
  const handleUpdateDiagnosis = async (id, status = 'active') => {
    try {
      await api.put(`/treatments/${id}/status`, {
        diagnosis: diagText,
        status
      });
      addToast('Diagnosis status updated');
      setUpdatingDiagId(null);
      setDiagText('');
      fetchDoctorData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Prescriptions: Add / Remove pill rows
  const handleAddMedRow = () => {
    setMedsList([...medsList, { name: '', dosage: '', frequency: 'Twice a day', duration: '7 days' }]);
  };

  const handleRemoveMedRow = (idx) => {
    setMedsList(medsList.filter((_, i) => i !== idx));
  };

  const handleMedChange = (idx, field, value) => {
    const updated = medsList.map((m, i) => i === idx ? { ...m, [field]: value } : m);
    setMedsList(updated);
  };

  // Save Prescription
  const handleSavePrescription = async (e) => {
    e.preventDefault();
    const activeTreatment = treatments.find(t => t._id === activeTreatmentId);
    if (!activeTreatment) return;

    try {
      await api.post('/prescriptions', {
        patientId: activeTreatment.patient._id,
        treatmentId: activeTreatmentId,
        appointmentId: activeTreatment.appointment._id,
        medications: medsList,
        instructions: prescriptionNotes
      });
      addToast('Prescription saved and medication alerts dispatched!');
      setPrescriptionNotes('');
      setMedsList([{ name: '', dosage: '', frequency: 'Twice a day', duration: '7 days' }]);
      setShowPrescriptionModal(false);
      fetchDoctorData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  if (loading || !user || user.role !== 'doctor') {
    return <div className="container"><p>Authenticating doctor permissions...</p></div>;
  }

  return (
    <div className="container">
      <div className="dashboard-grid">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary)', fontFamily: 'Outfit' }}>Clinic Desk</h3>
          <ul className="sidebar-menu">
            <li 
              className={`sidebar-item ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
            >
              👥 Assigned Patients ({myPatients.length})
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              📅 Schedule Slots ({myAppointments.filter(a => a.status === 'pending').length} New)
            </li>
            <li 
              className={`sidebar-item ${activeTab === 'treatments' ? 'active' : ''}`}
              onClick={() => setActiveTab('treatments')}
            >
              🩺 Medical Cycles
            </li>
          </ul>
        </aside>

        {/* Main Panel */}
        <main className="dashboard-main">
          {/* Header Row */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit' }}>Physician Consultation Dashboard</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, Dr. {user.name} ({myDoctorProfile.specialization || 'Consultant'}). Access patient histories, write prescriptions, and log checkup vitals.</p>
          </div>

          {/* Tab 1: Assigned Patients */}
          {activeTab === 'patients' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>👥 Your Assigned Patients</h3>
              {myPatients.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>You currently do not have any patient records assigned to you.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Age & Gender</th>
                        <th>Blood Group</th>
                        <th>Contact</th>
                        <th>Medical History</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myPatients.map((pat) => (
                        <tr key={pat._id}>
                          <td><strong>{pat.user?.name}</strong></td>
                          <td>{pat.age} yrs / {pat.gender}</td>
                          <td><span className="badge badge-active">{pat.bloodType}</span></td>
                          <td>{pat.phone}</td>
                          <td>
                            {pat.medicalHistory?.length > 0 ? (
                              pat.medicalHistory.map((h, i) => (
                                <span key={i} className="badge badge-pending" style={{ marginRight: '0.25rem' }}>{h}</span>
                              ))
                            ) : (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>None logged</span>
                            )}
                          </td>
                          <td>{pat.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Appointments Management */}
          {activeTab === 'appointments' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>📅 Appointments Assigned to You</h3>
              {myAppointments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No appointment schedules found.</p>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Patient</th>
                        <th>Date & Time</th>
                        <th>Reported Symptoms</th>
                        <th>Status</th>
                        <th>Action Buttons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAppointments.map((appt) => (
                        <tr key={appt._id}>
                          <td>
                            <strong>{appt.patient?.user?.name}</strong> <br />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Age: {appt.patient?.age} / Blood: {appt.patient?.bloodType}</span>
                          </td>
                          <td>
                            {new Date(appt.date).toLocaleDateString()} <br />
                            <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{appt.timeSlot}</span>
                          </td>
                          <td><p style={{ fontSize: '0.85rem', maxWidth: '300px' }}>{appt.symptoms}</p></td>
                          <td><span className={`badge badge-${appt.status}`}>{appt.status}</span></td>
                          <td>
                            {appt.status === 'pending' ? (
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleApptAction(appt._id, 'confirmed')} className="btn btn-success btn-sm">Confirm</button>
                                <button onClick={() => handleApptAction(appt._id, 'rejected')} className="btn btn-danger btn-sm">Reject</button>
                              </div>
                            ) : (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Closed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Medical Treatment Cycles */}
          {activeTab === 'treatments' && (
            <div className="card">
              <h3 style={{ marginBottom: '1.5rem' }}>🩺 Continuous Medical Care Cycles</h3>
              {myTreatments.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No active treatment cycles initialized yet. Confirm a patient's appointment request to start a treatment cycle.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {myTreatments.map((treat) => (
                    <div key={treat._id} className="clinical-record-card" style={{ borderLeft: '4px solid var(--primary)', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.15rem' }}>Patient: {treat.patient?.user?.name}</h4>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Age: {treat.patient?.age} | Blood: {treat.patient?.bloodType} | Diagnosis: <strong>{treat.diagnosis}</strong>
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={`badge badge-${treat.status}`}>{treat.status}</span>
                          {treat.status === 'active' && (
                            <button 
                              onClick={() => {
                                if (confirm('Mark this treatment cycle as completed?')) {
                                  handleUpdateDiagnosis(treat._id, 'completed');
                                }
                              }} 
                              className="btn btn-secondary btn-sm"
                            >
                              Complete Cycle
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Diagnosis Section */}
                      <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {updatingDiagId === treat._id ? (
                          <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                            <input 
                              type="text" 
                              className="form-input" 
                              style={{ padding: '0.4rem' }}
                              value={diagText} 
                              onChange={(e) => setDiagText(e.target.value)} 
                              placeholder="Type active diagnosis..."
                            />
                            <button onClick={() => handleUpdateDiagnosis(treat._id)} className="btn btn-success btn-sm">Save</button>
                            <button onClick={() => setUpdatingDiagId(null)} className="btn btn-secondary btn-sm">Cancel</button>
                          </div>
                        ) : (
                          <>
                            <span style={{ fontSize: '0.9rem' }}>🩺 <strong>Diagnosis:</strong> {treat.diagnosis}</span>
                            <button onClick={() => { setUpdatingDiagId(treat._id); setDiagText(treat.diagnosis); }} className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Update</button>
                          </>
                        )}
                      </div>

                      {/* Physical Checkups list */}
                      <div style={{ marginBottom: '1rem' }}>
                        <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Physical Checkup Records</h5>
                        {treat.checkups?.length === 0 ? (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No checkups logged yet.</p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {treat.checkups.map((ck, idx) => (
                              <div key={idx} style={{ background: '#fafafa', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                  <span>Date: {new Date(ck.date).toLocaleDateString()}</span>
                                  <strong>Checkup #{idx + 1}</strong>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '500' }}>
                                  <span>BP: <strong style={{ color: 'var(--primary)' }}>{ck.bloodPressure || 'N/A'}</strong></span>
                                  <span>Pulse: <strong>{ck.pulse || 'N/A'} bpm</strong></span>
                                  <span>Weight: <strong>{ck.weight || 'N/A'} kg</strong></span>
                                  <span>Height: <strong>{ck.height || 'N/A'} cm</strong></span>
                                </div>
                                {ck.notes && <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>Notes: {ck.notes}</p>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Follow-Ups lists */}
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Follow-up Visit Schedule</h5>
                        {treat.followUps?.length === 0 ? (
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No follow-up dates scheduled.</p>
                        ) : (
                          <ul style={{ listStyle: 'none', paddingLeft: '0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {treat.followUps.map((fl, idx) => (
                              <li key={idx} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', padding: '0.4rem', background: '#fafafa', borderLeft: '3px solid var(--warning)', borderRadius: '4px' }}>
                                <span>📅 {new Date(fl.date).toLocaleDateString()} - {fl.notes || 'Routine checkup'}</span>
                                <span className={`badge badge-${fl.status}`} style={{ fontSize: '0.7rem' }}>{fl.status}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                          onClick={() => { setActiveTreatmentId(treat._id); setShowCheckupModal(true); }} 
                          className="btn btn-primary btn-sm"
                          disabled={treat.status !== 'active'}
                        >
                          ➕ Add Checkup Vitals
                        </button>
                        <button 
                          onClick={() => { setActiveTreatmentId(treat._id); setShowFollowupModal(true); }} 
                          className="btn btn-secondary btn-sm"
                          disabled={treat.status !== 'active'}
                        >
                          🗓️ Schedule Follow-Up
                        </button>
                        <button 
                          onClick={() => { setActiveTreatmentId(treat._id); setShowPrescriptionModal(true); }} 
                          className="btn btn-success btn-sm"
                          disabled={treat.status !== 'active'}
                        >
                          💊 Write Prescription
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Add Checkup Modal */}
      {showCheckupModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Log Physical Checkup Vitals</h3>
              <button className="modal-close" onClick={() => setShowCheckupModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddCheckup}>
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Blood Pressure (e.g. 120/80)</label>
                    <input type="text" className="form-input" placeholder="120/80" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pulse (bpm)</label>
                    <input type="number" className="form-input" placeholder="72" value={pulse} onChange={(e) => setPulse(e.target.value)} required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input type="number" step="0.1" className="form-input" placeholder="70.5" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Height (cm)</label>
                    <input type="number" className="form-input" placeholder="175" value={height} onChange={(e) => setHeight(e.target.value)} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Consultation Notes / Medical Findings</label>
                  <textarea 
                    className="form-input" 
                    style={{ minHeight: '80px', resize: 'vertical' }} 
                    placeholder="Findings after physical examination..." 
                    value={checkupNotes}
                    onChange={(e) => setCheckupNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCheckupModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Vitals</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Follow-up Modal */}
      {showFollowupModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Schedule Follow-Up Visit</h3>
              <button className="modal-close" onClick={() => setShowFollowupModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleAddFollowup}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Date of Next Visit</label>
                  <input type="date" className="form-input" value={followupDate} onChange={(e) => setFollowupDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Instructions / Reason for Visit</label>
                  <input type="text" className="form-input" placeholder="e.g. Vitals monitor, review blood sugar status" value={followupNotes} onChange={(e) => setFollowupNotes(e.target.value)} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowFollowupModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Visit</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Write Prescription Modal */}
      {showPrescriptionModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h3>Draft Digital Prescription</h3>
              <button className="modal-close" onClick={() => setShowPrescriptionModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSavePrescription}>
              <div className="modal-body" style={{ maxHeight: '60vh' }}>
                <h5 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Medications Intake List</h5>
                {medsList.map((med, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr auto', gap: '0.5rem', alignItems: 'end', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px dashed var(--border-color)' }}>
                    <div className="form-group" style={{ margin: '0' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Medication Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Paracetamol"
                        value={med.name} 
                        onChange={(e) => handleMedChange(idx, 'name', e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ margin: '0' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Dosage</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="500mg"
                        value={med.dosage} 
                        onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ margin: '0' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Frequency</label>
                      <select 
                        className="form-select"
                        value={med.frequency} 
                        onChange={(e) => handleMedChange(idx, 'frequency', e.target.value)}
                      >
                        <option value="Once daily (morning)">Once daily (morning)</option>
                        <option value="Once daily (night)">Once daily (night)</option>
                        <option value="Twice a day">Twice a day (1-0-1)</option>
                        <option value="Three times a day">Three times a day (1-1-1)</option>
                        <option value="Every 4 hours">Every 4 hours</option>
                        <option value="As needed (SOS)">As needed (SOS)</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ margin: '0' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Duration</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="5 days"
                        value={med.duration} 
                        onChange={(e) => handleMedChange(idx, 'duration', e.target.value)} 
                        required 
                      />
                    </div>
                    {medsList.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => handleRemoveMedRow(idx)} 
                        className="btn btn-danger btn-sm"
                        style={{ padding: '0.55rem', alignSelf: 'end' }}
                      >
                        &times;
                      </button>
                    )}
                  </div>
                ))}
                
                <button type="button" onClick={handleAddMedRow} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem' }}>
                  ➕ Add another medicine
                </button>

                <div className="form-group">
                  <label className="form-label">Special Intake Instructions / Diet recommendations</label>
                  <textarea 
                    className="form-input" 
                    placeholder="Take after meals. Drink plenty of water." 
                    value={prescriptionNotes}
                    onChange={(e) => setPrescriptionNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowPrescriptionModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-success">Issue Prescription</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
