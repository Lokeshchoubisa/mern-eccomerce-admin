import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom"
import { signout } from '../../actions';

export default function Header() {
  const auth=useSelector(state=>state.auth);
  const dispatch = useDispatch();

  const renderLoggedInLinks = () => {
    return (<Nav>
      <li className="nav-item">
        <span  className="nav-link" onClick={()=>
        {
          dispatch(signout());
        }}>Signout</span>
      </li>

    </Nav>)
  };

  const renderNotLoggedInLinks=()=>
  {
    return (<Nav>
      <li className="nav-item">
        <NavLink to="/signin" className="nav-link">Sign in</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="signup" className="nav-link">Sign up</NavLink>
      </li>

    </Nav>)
  };










  return (
    <>
      <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
        <Container fluid>
          {/* <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand> */}
          <Link className="navbar-brand" to="/">Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
         <NavDropdown.Divider /> 
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
       </NavDropdown>  */}
            </Nav>
        {auth.authenticate ? renderLoggedInLinks() :renderNotLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}


