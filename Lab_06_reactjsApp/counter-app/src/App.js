import React, { useState } from 'react';
import './App.css'; // Importing our new styles!

export default function Counter() {
  const [count, setCount] = useState(0);

  // Prevent count from going below 0 [cite: 99]
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h2 className="title">Counter App</h2>
        <h1 className="count-display">{count}</h1>
        
        <div className="button-group">
          <button className="btn btn-add" onClick={() => setCount(count + 1)}>
            +
          </button>
          <button className="btn btn-subtract" onClick={decrement}>
            -
          </button>
        </div>
        
        <button className="btn btn-reset" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
