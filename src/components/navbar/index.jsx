import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For simplicity, we'll just navigate to the login page
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/list">List of Wines</Link>
        </li>
        <li>
          <Link to="/add">Add Wine</Link>
        </li>
        <li>
          <Link to="/edit">Edit Wine</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
