import React, { useState } from 'react';
import './App.css';

export default function Actions() {
  const [message, setMessage] = useState('Interact with me!');
  const [bgColor, setBgColor] = useState('#1e1e2f');
  const [textColor, setTextColor] = useState('#a5b4fc');

  // Toggles the main background color to a darker shade
  const handleBgChange = () => {
    setBgColor(prev => prev === '#1e1e2f' ? '#111827' : '#1e1e2f');
  };

  return (
    <div className="event-container" style={{ backgroundColor: bgColor }}>
      <div className="event-card">
        <h2 className="title" style={{ color: textColor }}>{message}</h2>
        
        <div className="button-layout">
          <button 
            className="btn-event btn-msg" 
            onClick={() => setMessage('You clicked the message button!')}
            onMouseOver={() => setTextColor('#22d3ee')}
            onMouseOut={() => setTextColor('#a5b4fc')}
          >
            Show Message
          </button>
          
          <button 
            className="btn-event btn-bg" 
            onClick={handleBgChange}
            onMouseOver={() => setTextColor('#f472b6')}
            onMouseOut={() => setTextColor('#a5b4fc')}
          >
            Change Background
          </button>
          
          <button 
            className="btn-event btn-alert" 
            onClick={() => alert('This is your alert!')}
            onMouseOver={() => setTextColor('#fbbf24')}
            onMouseOut={() => setTextColor('#a5b4fc')}
          >
            Show Alert
          </button>
        </div>
      </div>
    </div>
  );
}
