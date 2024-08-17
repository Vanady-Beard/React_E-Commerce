import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Modal } from 'react-bootstrap';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState(null);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/customers/${currentCustomerId}`, formData);
        setModalMessage('Customer updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/customers', formData);
        setModalMessage('Customer added successfully!');
      }
      setShow(true);
      setCustomers((prev) => [...prev, formData]);
      setFormData({ name: '', email: '', phone: '' });
      setIsEditing(false);
      setCurrentCustomerId(null);
    } catch (err) {
      console.error('Failed to add/update customer:', err);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      setCustomers(customers.filter(customer => customer.customerID !== id));
      setModalMessage('Customer deleted successfully!');
      setShow(true);
    } catch (err) {
      console.error('Failed to delete customer:', err);
    }
  };

  const editCustomer = (customer) => {
    setIsEditing(true);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
    setCurrentCustomerId(customer.customerID);
  };

  const handleClose = () => setShow(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Customers</h2>

      <Form onSubmit={handleSubmit} className="mt-4">
        <h4>{isEditing ? 'Edit Customer' : 'Add New Customer'}</h4>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPhone" className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}>
          {isEditing ? 'Save Changes' : 'Add Customer'}
        </Button>
      </Form>

      <div className="d-flex flex-wrap justify-content-around mt-4">
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
              <Button
                variant="outline-primary"
                style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}
                onClick={() => editCustomer(customer)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}
                onClick={() => deleteCustomer(customer.customerID)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerList;
