import React, { useState } from "react";
import "../auth/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Base API URL from env

function Signin({ setuser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/api/signin`, // Use full URL
        formData,
        { withCredentials: true } // Required for cookies (JWT)
      );
      console.log("Login Successfull!! ", res.data);
      setuser(res.data.user);
      alert("Login Successful!!");
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign In</button>

        <Link to="/signup" className="signup-link-button">
          Not registered? Click here
        </Link>
      </form>
    </div>
  );
}

export default Signin;
