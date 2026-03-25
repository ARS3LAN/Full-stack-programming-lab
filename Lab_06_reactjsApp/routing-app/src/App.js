import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const Home = () => (
  <div className="page-card">
    <h1 className="glow-text">Welcome Home</h1>
    <p>Explore our modern React application.</p>
  </div>
);

const About = () => (
  <div className="page-card">
    <h1 className="glow-text">About Us</h1>
    <p>We build beautiful, interactive web experiences using React Router.</p>
  </div>
);

const Contact = () => (
  <div className="page-card">
    <h1 className="glow-text">Contact Us</h1>
    <form className="contact-form">
      <input type="text" placeholder="Name" className="input-field" required />
      <input type="email" placeholder="Email" className="input-field" required />
      <textarea placeholder="Message" className="input-field textarea" required></textarea>
      <button type="button" className="btn-submit">Send Message</button>
    </form>
  </div>
);

const Products = () => (
  <div className="page-card" style={{ maxWidth: '700px' }}>
    <h1 className="glow-text">Our Products</h1>
    <div className="product-grid">
      <div className="product-card">
        <h3>Wireless Mouse</h3>
        <p>Ergonomic and fast. Zero latency.</p>
        <button className="btn-cart">Add to Cart</button>
      </div>
      <div className="product-card">
        <h3>Mechanical Keyboard</h3>
        <p>Tactile switches with RGB backlight.</p>
        <button className="btn-cart">Add to Cart</button>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="page-card">
    <h1 className="error-text">404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <nav className="navbar">
          <h2 className="logo">TechStore</h2>
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/about" className="nav-item">About</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
            <Link to="/products" className="nav-item">Products</Link>
          </div>
        </nav>
        
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
