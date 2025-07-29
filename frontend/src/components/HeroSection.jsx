import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import heroImage from '../assets/hero1.png';

function HeroSection() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const navigate=useNavigate();


  //usw use uedr effect to check the mount of login status

  useEffect(()=>{
    const checkLoginStutes=async()=>{
      try {
        const response= await axios.get(`${API_URL}/api/check-auth-status`,{
          withCredentials:true,
        })
        if(response.data.isLoggedIn){
          setIsLoggedIn(true);
        }else{
          setIsLoggedIn(false);
        }
        
      } catch (error) {
        setIsLoggedIn(false);
        console.error(`Login status check failed: ${error}`);
      } finally {
      setIsLoading(false); // <- ADD THIS LINE
    }

    }; 
    checkLoginStutes();
  },[])



  const handleClick=()=>{
    if(isLoading){
      alert("Please wait while login status is being checked.");
      return ;
    }
    if(isLoggedIn){
      navigate("/projectUpload");
    }else{
       alert("Please login to upload project!");
    }
  }
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Showcase & Earn from Your Student Projects</h1>
          <p>Upload coding projects and make money</p>
          <button className="upload-btn" onClick={handleClick} disabled={isLoading}>Upload Project</button>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">
            <img src={heroImage} alt="Showcase project" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
