import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");

  const [formdata, setFormdata] = useState({
    fullName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    collegeName: "",
    branch: "",
    github: "",
    linkedin: "",
    companyName: "",
    designation: "",
    companyWebsite: "",
    recruiterLinkedin: "",
    adminDept: "",
    adminCode: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formdata) {
      if (formdata[key]) {
        data.append(key, formdata[key]);
      }
    }

    if (profilePicture) {
      data.append("profilePicture", profilePicture);
    }

    data.append("role", role);

    try {
      const response = await axios.post("/api/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.data);
      alert("Signup Successful!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Create Your CodeBazaar Account</h2>
        <label htmlFor="Profile">Profile Picture :</label>
        <input type="file" accept="image/*" name="profilePicture" onChange={handleProfilePicChange} />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="student">Student</option>
          <option value="recuritor">Recruiter</option>
          <option value="admin">Admin</option>
        </select>

        {role === "student" && (
          <>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              required
              onChange={handleChange}
            />
            <input
              type="url"
              name="github"
              placeholder="GitHub URL"
              onChange={handleChange}
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn URL"
              onChange={handleChange}
            />
          </>
        )}

        {role === "recuritor" && (
          <>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              onChange={handleChange}
            />
            <input
              type="url"
              name="companyWebsite"
              placeholder="Company Website"
              onChange={handleChange}
            />
            <input
              type="url"
              name="recruiterLinkedin"
              placeholder="LinkedIn"
              onChange={handleChange}
            />
          </>
        )}

        {role === "admin" && (
          <>
            <input
              type="text"
              name="adminDept"
              placeholder="Admin Department"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="adminCode"
              placeholder="Admin Code"
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
