import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';

// import { bootstrapUtils } from 'react-bootstrap/lib/utils';

import './styles.scss';

// bootstrapUtils.addStyle(Navbar, 'custom');

const PublicNavigation = () => (
  <div className="public-navbar">
    <Navbar expand="sm">
      <LinkContainer to="/">
        <Navbar.Brand>HUB 31</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <LinkContainer to="/become-teacher">
          <Nav.Link>BECOME A TEACHER</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/signup">
          <Nav.Link>Sign Up</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Log In</Nav.Link>
        </LinkContainer>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default PublicNavigation;
