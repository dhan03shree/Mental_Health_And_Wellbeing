import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setMessage("Please enter your email.");
            return;
        }

        // Simulate API request (Replace this with real API call)
        setTimeout(() => {
            setMessage("A password reset link has been sent to your email.");
        }, 1000);
    };

    return (
        <div className="forgot-password-container">
            <form id="forgot-password-form" onSubmit={handleSubmit}>
                <h2>Forgot Password?</h2>
                <p>Enter your email to receive a password reset link.</p>

                {message && <p className="message">{message}</p>}

                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Send Reset Link</button>

                {/* Back to Login */}
                <p className="back-to-login" onClick={() => navigate('/login')}>
                    Back to Login
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
