// src/CustomerDetails.jsx


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({ name: '', email: '', phone: '' });

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => {
    setUpdatedCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
    setShowEdit(true);
  };

  const customers = [
    { id: 1, name: 'Alice Wonderland', email: 'alice@wonderland.com', phone: '123-456-7890' },
    { id: 2, name: 'Cinderella Charming', email: 'cinderella@charming.com', phone: '234-567-8901' },
    { id: 3, name: 'Belle Beauty', email: 'belle@beauty.com', phone: '345-678-9012' },
  ];
  const customer = customers.find((customer) => customer.id === parseInt(id, 10));

  if (!customer) return <div>Customer not found</div>;

  const handleDeleteCustomer = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      navigate('/customers');
    } catch (err) {
      console.error('Failed to delete customer.');
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, updatedCustomer);
      setShowEdit(false);
      navigate('/customers');
    } catch (err) {
      console.error('Failed to update customer.');
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
      <Card.Body>
        <Card.Title style={{ color: 'hotpink' }}>{customer.name}</Card.Title>
        <Card.Text>Email: {customer.email}</Card.Text>
        <Card.Text>Phone: {customer.phone}</Card.Text>
        <Button
          variant="outline-primary"
          style={{ borderColor: 'hotpink', color: 'hotpink', marginRight: '10px' }}
          onClick={handleShowEdit}
        >
          Edit Customer
        </Button>
        <Button
          variant="outline-danger"
          style={{ borderColor: 'hotpink', color: 'hotpink' }}
          onClick={handleDeleteCustomer}
        >
          Delete Customer
        </Button>
      </Card.Body>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={updatedCustomer.name}
                onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={updatedCustomer.email}
                onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={updatedCustomer.phone}
                onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCustomer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default CustomerDetails;

