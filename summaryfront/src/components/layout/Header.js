  
import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptins";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,NavDropdown,Form,Button,FormControl} from 'react-bootstrap'
import Search from "./searchBar";
//hi
export default function Header() {
  return (

  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Link to="/"><Navbar.Brand href="#home">Summary App</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Search/>
    <AuthOptions/>
  </Navbar.Collapse>
 
</Navbar>
        
  );
}