import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/auth.context'; 

function SignupPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext); 

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);
    const handleBirthdate = (e) => setBirthdate(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { email, password, username, birthdate };
        // console.log(requestBody);
     
        axios.post('http://localhost:5005/api/signup', requestBody)
          .then((response) => {
            // console.log('JWT token', response.data.authToken );
            storeToken(response.data.authToken);  
            authenticateUser();  
            navigate('/'); 
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
            console.log(errorDescription);
          })
      };

    return (
        <div className="SignupPage">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignupSubmit}>
                <label> Username:
                    <input type="text" name="name" value={username} onChange={handleUsername}/> </label>
                <label> Birthdate:
                    <input type="date" name="birthdate" value={birthdate} onChange={handleBirthdate}/> </label>    
                <label> Email:
                    <input type="email" name="email" value={email} onChange={handleEmail}/> </label>
                <label> Password:
                    <input type="password" name="password" value={password} onChange={handlePassword}/> </label>
                <button type="submit">Sign Up</button>
            </form>
            { errorMessage && <p className="error-message">{errorMessage}</p> }
            <Link to={"/login"}> I already have an account</Link>
        </div>
    )
}

export default SignupPage;