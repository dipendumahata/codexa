import React, { useEffect, useState } from 'react';
import "./CreateHackathonBox.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CreateHackathonBox() {
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
      alert('Please login to upload Hackathon!')
    }
  }


  return (
    <div className="hackathon-container">
      <p className="quote-text">Build. Collaborate. Compete. Create now.</p>
      <button className="create-button" onClick={handleClicked} disabled={isLoading}>Create Hackathon</button>
    </div>
  );
}

export default CreateHackathonBox;
