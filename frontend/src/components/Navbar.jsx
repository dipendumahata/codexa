import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


function Navbar({ user, setuser }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await axios.get(`${API_URL}/api/logout`, { withCredentials: true });
      setuser(null);
      navigate('/');
      alert("Logout Successfully!!");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>CodeBazaar</div>

        <ul className="nav-links">
          <li><a onClick={() => navigate("/getallprojects")}>Projects</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a onClick={() => navigate("/hack")}>Hackathons</a></li>
          <li><a href="#">Mentorship</a></li>
          <li><a href="#">Recruiters Panel</a></li>
        </ul>

        {!user ? (
          <button className="login-btn" onClick={handleLoginClick}>
            Log in / Signup
          </button>
        ) : (
          <div className="profile-area">
            <img
              src={user.profilePicture || "/default-avatar.png"} // fallback
              alt="Profile"
              className="profile-pic"
            />
            <span className="username">{user.fullName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
