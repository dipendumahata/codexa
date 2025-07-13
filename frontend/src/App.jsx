import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Singup";
import MainPage from "./MainPage";
import TutorialUploadForm from "./components/toturials/TutorialUploadForm";
import Hackathon from "./components/Hackathons/App"
import HackathonCreateForm from "./components/Hackathons/HackathonForm";
import UploadProject from "./components/Project/UploadProject";
import ProjectCard from "./components/Project/ProjectCard";
import AllProject from "./components/Project/App"
import ProjectCardPage from "./components/Project/ProjectCardPage";
import ProjectDetails from "./components/Project/view-project/ProjectDetails";
function App() {
  const [user, setuser] = useState(null);
  const [tutorials, setTutorials] = useState([]);

  const getuser = async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });
      setuser(res.data);
    } catch (err) {
      console.error("User fetch failed:", err.message);
    }
  };

  const fetchTutorials = async () => {
    try {
      const res = await axios.get("/api/photos", { withCredentials: true });
      setTutorials(res.data);
    } catch (err) {
      console.error("Tutorial fetch failed:", err.message);
    }
  };

  useEffect(() => {
    getuser();
    fetchTutorials();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setuser={setuser} />
      <Routes>
        <Route path="/" element={<MainPage tutorials={tutorials} setTutorials={setTutorials} user={user} /> } />
        <Route path="/signin" element={<Signin setuser={setuser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<TutorialUploadForm/>} />


        <Route path="/hack" element={<Hackathon/>} />
        <Route path="/hackSignup" element={<HackathonCreateForm/>} />


        {/* //projects */}
        <Route path="/projectUpload" element={<UploadProject/>}/>
        <Route path="/getallprojects" element={<AllProject/>} />
        
        {/* //view project */}
        {/* //If using React Router, in App.jsx */}
        <Route path="/projects/:id" element={<ProjectDetails />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
