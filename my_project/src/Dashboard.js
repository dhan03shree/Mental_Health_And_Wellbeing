import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login session
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      <header>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/sos">SOS Help</Link></li>
            <li><Link to="/assessment">Assessment</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="/videos">Videos</Link></li>
            <li><Link to="/moodtracker">Mood Track</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/taskmanager">Task Management</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li> {/* Logout Button */}
          </ul>
        </nav>
      </header>

      <main className="dashboard-content">
        <h2>Welcome To</h2>
        <h1 className="app-title">Mental Health & Wellbeing App</h1>
      </main>
    </div>
  );
}

export default Dashboard;
