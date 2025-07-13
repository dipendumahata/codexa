
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//AuthCOntext object banao ye auth related values ko global provide krega

const AuthContextObject=createContext({
    user:null,
    isLoggedIn:false,
    login:async()=>{},
    logout:async()=>{},
    isLoading:true,

})


// ye children props accpet krega ,jise ye 'AuthCOntextObject.provider ke andar render krega
//is trah wrap kiye giye object ke har ke component context ko access kar payega

function AuthContext({children}) {
    const[isLoggedIn,setIsLoggedIn]=useState(false); //login stutes
    const[user,setUser]=useState(null); //user ka data
    const[isLoading,setIsLoading]=useState(true);

    const navigate=useNavigate();


    //useEffect laga rhe hai login hai ya nhi check karne ke liye initial

    useEffect(()=>{
        const checkLoginStatus=async()=>{
            try {
                //backend api ko call kro take cookie meain jwt token ko verify krega
           const response= await axios.get(`/api/check-auth-status`,{
                    withCredentials:true   // ye important hai brower ko cookie (including httpOnly cookie) request ke sath bhejne ke liye{like https://}

                });
                //agar respose me isLoggedIn true aata hai to authanticate hai\
                if(response.data.isLoggedIn){
                    setIsLoggedIn(true);
                    setUser(response.data.user)
                }else{
                    setIsLoggedIn(false);
                    setUser(null)
                }
                
            } catch (error) {

                //agar api me kuch error aaya to 
                 setIsLoggedIn(false);
                 setUser(null)
                 console.error("Login status check failed:" ,error)

            } finally{
                setIsLoading(false);
            }
        };
        checkLoginStatus();
    },[]);

    //login function :Email and password ko lekar backend api ko call karen

    const login= async(email,password)=>{
        try {
            setIsLoading(false);
            const response= await axios.post(`/api/signin`,{email,password},{
                withCredentials:true //cookie vejne ke liye
            })
            
        } catch (error) {
            
        }
    }


  return (
    <div>
      
    </div>
  )
}

export default AuthContext
