import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context'; 

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext); 

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
     
        axios.post('http://localhost:5005/api/login', requestBody)
          .then((response) => {
            // console.log('JWT token', response.data.authToken );
            storeToken(response.data.authToken);  
            authenticateUser();  
            navigate('/');                                 
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
      };

    return (
        <div className="LoginPage">
        <h1>Login</h1>
  
        <form onSubmit={handleLoginSubmit}>
            <label> Email:
                <input type="email" name="email" value={email} onChange={handleEmail}/> </label>
            <label> Password:
                <input type="password" name="password" value={password} onChange={handlePassword}/> </label>
            <button type="submit">Log In</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to={"/signup"}> I don't have an account yet </Link>
      </div>
    )
}

export default LoginPage;