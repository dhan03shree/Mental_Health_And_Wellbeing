import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email and password
    const matchedUser = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      // Save the logged-in user in sessionStorage (better for temporary sessions)
      sessionStorage.setItem('loggedInUser', JSON.stringify(matchedUser));

      alert('Login Successful! Redirecting to Dashboard...');
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form id="log" onSubmit={handleSubmit}>
        <h2>Login Here</h2>

        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <p className="forgot-password">
          <Link to="/forgotpassword" className="link">Forgot Password?</Link>
        </p>
        
        <p className="register-link">
          Don't have an account? <Link to="/register" className="link">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
