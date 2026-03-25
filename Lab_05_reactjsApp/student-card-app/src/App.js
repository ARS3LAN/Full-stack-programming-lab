import './App.css';

function StudentCard(props) {
  return (
    <div className="card" style={{ borderTop: `6px solid ${props.color}` }}>
      <h2 className="card-title">{props.name}</h2>
      <div className="card-details">
        <p><strong>Roll No:</strong> {props.rollNo}</p>
        <p><strong>Department:</strong> {props.department}</p>
        <p><strong>University:</strong> {props.university}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="header">Student Information</h1>
      <div className="card-grid">
        <StudentCard name="Ali Raza" rollNo="01" department="Software Engineering" university="Air University" color="#3498db" />
        <StudentCard name="Ali Hamza" rollNo="02" department="Software Engineering" university="Air University" color="#2ecc71" />
        <StudentCard name="Ayesha" rollNo="03" department="Software Engineering" university="Air University" color="#e74c3c" />
      </div>
    </div>
  );
}

export default App;
