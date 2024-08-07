// src/NavigationBar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" style={{ color: 'hotpink', fontWeight: 'bold' }}>
        PinkShop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={{ color: 'hotpink' }}>
            Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" style={{ color: 'hotpink' }}>
            Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/orders" style={{ color: 'hotpink' }}>
            Orders
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

