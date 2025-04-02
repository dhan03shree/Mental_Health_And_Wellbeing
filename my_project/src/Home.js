import React from 'react';

import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div id="full">
      <header>
        <nav>
          <ul>
            <li id="topic">SafeYou</li>
          </ul>
        </nav>
      </header>

      <main>
        <h2>Your safety and well-being all in one place</h2>
        
        <div className="button-container">
          <Link to="/register">
            <button aria-label="Go to Registration Page" className="home-button">Go To Registration Page</button>
          </Link>
          <Link to="/login">
            <button aria-label="Go to Login Page" className="home-button">Go To Login Page</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
