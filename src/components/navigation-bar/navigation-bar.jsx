import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../redux/reducers/user';

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" />
        <Nav className="me-auto">
          {!localStorage.user && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
          {localStorage.user && (
            <>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to="/images">
                Gallery
              </Nav.Link>
              <Nav.Link onClick={() => dispatch(clearUser())}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}