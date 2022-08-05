import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }


  const authenticateUser = () => { 

    const storedToken = localStorage.getItem('authToken');
    // console.log(storedToken);

    if (storedToken) {
    axios
      .get(process.env.REACT_APP_API_URL + '/verify', { headers: { Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        const user = response.data;
        setUser(user);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((error) => { 
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
    });
  } else {
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);    
  }
}

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  
  // const navigate = useNavigate();

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    // navigate('/');      
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };