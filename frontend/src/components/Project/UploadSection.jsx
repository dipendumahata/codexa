import React, { useEffect, useState } from 'react';
import './UploadSection.css';
import { useNavigate } from 'react-router-dom';

const UploadSection = () => {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isLoading,setIsLoading]=useState(true);
  const navigate=useNavigate();

    useEffect(() => {
  const checklogin = async () => {
    try {
      const response = await axios.get("/api/check-auth-status", {
        withCredentials: true,
      });
      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
      console.error(`Login status check failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  checklogin();
}, []);


  const handleClicked=()=>{
    if(isLoading){
      alert(' Please wait While login status being Checked!');
      return ;
    }
    if(isLoggedIn){
      navigate("/hackSignup")
    }
    else{
      alert('Please login to upload Projects!')
    }
  }

  return (
    <div className="upload-section">
      <div className="upload-content">
        <h1 className="animated fadeInUp">
          Showcase & Earn <br /> from Your Student Projects
        </h1>
        <p className="animated fadeInUp delay-1">Upload coding project and make money</p>
        <button className="upload-button animated fadeInUp delay-2" onClick={handleClicked} disabled={isLoading}>Upload Project</button>
      </div>
    </div>
  );
};

export default UploadSection;