import React, { useContext } from "react";
import { Card, CardColumns, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
//import "./style.css"
//hi
export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.displayName}</h1>
      ) : (
        <>
          <h2>Summary Home</h2>
          <Link to="/login">Log in</Link>
        </>
      )}

    
      
        

      
      
    </div>
  );
}
