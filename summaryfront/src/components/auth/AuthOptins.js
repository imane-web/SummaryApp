import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    
    //hi
      <Nav>
      {userData.user ? (
        <Nav.Link href="#deets" onClick={logout}>Log out</Nav.Link>
      ) : (
        <>
        <Nav.Link href="#deets" onClick={register}>Register</Nav.Link>
        <Nav.Link eventKey={2} href="#memes" onClick={login}>Log in</Nav.Link>
        </>
      )}
    </Nav>
    

  );
}
