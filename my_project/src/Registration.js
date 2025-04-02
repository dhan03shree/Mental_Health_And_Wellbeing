import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Registration.css';

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    // Get stored users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (storedUsers.find((user) => user.email === email)) {
      setError('User already registered. Please log in.');
      return;
    }

    // Store new user data in localStorage
    const newUser = { email, password };
    localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));

    alert('Registration Successful! Please log in.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password (Min 6 characters)" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="register-btn">Register</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>
    </div>
  );
}

export default Registration;
