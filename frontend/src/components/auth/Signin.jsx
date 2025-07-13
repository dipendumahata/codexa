import React, { useState } from "react";
import "../auth/Signin.css";
import { Link } from "react-router-dom"; // Make sure you're using react-router
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Signin({setuser}) {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const res= await axios.post("/api/signin",formData,
              { withCredentials: true } // 👈 required for cookies
        );
        console.log("Login Successfull!! ",res.data)
        setuser(res.data.user)
        alert("Login Successfull!!")
        navigate("/")
      
        
    } catch (error) {
     console.error('Login Failed:', error.response?.data || error.message);

      alert('Login failed');
    }
    console.log("Sign In Data:", formData);
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

        {/* Signup Link styled as button */}
        <Link to="/signup" className="signup-link-button">
          Not registered? Click here
        </Link>
      </form>
    </div>
  );
}

export default Signin;
