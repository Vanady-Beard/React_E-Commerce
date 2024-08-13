
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Modal } from 'react-bootstrap';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
      } catch (err) {
        setError('Failed to fetch customers.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/customers', newCustomer);
      setCustomers([...customers, response.data]);
      setNewCustomer({ name: '', email: '', phone: '' });
      handleClose();
    } catch (err) {
      setError('Failed to create customer.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Customers</h2>
      <Button variant="outline-primary" onClick={handleShow} style={{ borderColor: 'hotpink', color: 'hotpink', marginBottom: '20px' }}>
        Add Customer
      </Button>

      <div className="d-flex flex-wrap justify-content-around">
        {customers.map((customer) => (
          <Card
            key={customer.customerID}
            style={{ width: '18rem', margin: '10px', borderColor: 'hotpink' }}
          >
            <Card.Body>
              <Card.Title>{customer.name}</Card.Title>
              <Card.Text>Email: {customer.email}</Card.Text>
              <Card.Text>Phone: {customer.phone}</Card.Text>
              <Link to={`/customer/${customer.customerID}`}>
                <Button variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink' }}>
                  View Details
                </Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateCustomer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerList;
