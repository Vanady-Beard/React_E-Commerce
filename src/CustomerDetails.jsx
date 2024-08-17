import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/customers/${id}`);
        setCustomer(response.data);
        setFormData({ name: response.data.name, email: response.data.email, phone: response.data.phone });
      } catch (err) {
        setError('Failed to fetch customer.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${id}`, formData);
      setCustomer({ ...customer, ...formData });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update customer:', err);
    }
  };

  const deleteCustomer = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${id}`);
      navigate('/customers');
    } catch (err) {
      console.error('Failed to delete customer:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>No customer found</div>;

  return (
    <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
      <Card.Body>
        {isEditing ? (
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button
              variant="outline-success"
              style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}
              onClick={handleUpdate}
            >
              Save
            </Button>
            <Button
              variant="outline-secondary"
              style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px', marginLeft: '10px' }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <Card.Title style={{ color: 'hotpink' }}>{customer.name}</Card.Title>
            <Card.Text>Email: {customer.email}</Card.Text>
            <Card.Text>Phone: {customer.phone}</Card.Text>
            <Button
              variant="outline-primary"
              style={{ borderColor: 'hotpink', color: 'hotpink', marginRight: '10px' }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              style={{ borderColor: 'hotpink', color: 'hotpink' }}
              onClick={deleteCustomer}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CustomerDetails;

