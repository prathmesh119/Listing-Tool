import React, { useState } from 'react';
import ListingTool from './components/ListingTool';
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="App">
      <button 
        className="hamburger-menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h3>Visit Our Other Websites</h3>
        <a href="https://google.com" className="sidebar-link">
          <i className="fas fa-shopping-cart"></i>
          <span>E-commerce</span>
        </a>
        <a href="https://example.com" className="sidebar-link">
          <i className="fas fa-tasks"></i>
          <span>Task Manager</span>
        </a>
        <a href="https://example.com" className="sidebar-link">
          <i className="fas fa-calendar"></i>
          <span>Calendar</span>
        </a>
        <a href="https://example.com" className="sidebar-link">
          <i className="fas fa-notes-medical"></i>
          <span>Health Tracker</span>
        </a>
      </div>
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <ListingTool />
      </div>
    </div>
  );
}

export default App;
