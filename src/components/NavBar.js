import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

    return(
        <>  
            <NavLink to="/"> Home </NavLink>
            {!isLoggedIn &&
            <>
                <NavLink to="/signup"> Sign Up </NavLink>
                <NavLink to="/login"> Log In </NavLink>
            </>}   
            {isLoggedIn && <button onClick={logOutUser}> Log Out</button>}
        </>
    )
}

export default NavBar;