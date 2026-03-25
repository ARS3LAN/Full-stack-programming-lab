import React, { useState } from 'react';
import './App.css';

export default function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ name: '', email: '' }); 
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="title">User Form</h2>
        
        <form onSubmit={handleSubmit} className="form-layout">
          <input 
            className="input-field" type="text" name="name" 
            value={formData.name} onChange={handleChange} 
            placeholder="Name" required 
          />
          <input 
            className="input-field" type="email" name="email" 
            value={formData.email} onChange={handleChange} 
            placeholder="Email" required 
          />
          <button className="btn-submit" type="submit">Submit</button>
        </form>
        
        {submittedData && (
          <div className="result-box">
            <h3>Submitted Data</h3>
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
