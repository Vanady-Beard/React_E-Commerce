import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';

const OrderStatus = () => {
  const [orderID, setOrderID] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setOrderID(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderID}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Track Order Status</h2>

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formOrderID">
          <Form.Label>Order ID</Form.Label>
          <Form.Control
            type="text"
            name="orderID"
            value={orderID}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}>
          Track Order
        </Button>
      </Form>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {orderDetails && (
        <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
          <Card.Body>
            <Card.Title>Order #{orderDetails.orderID}</Card.Title>
            <Card.Text>Customer: {orderDetails.customerName}</Card.Text>
            <Card.Text>Order Date: {orderDetails.orderDate}</Card.Text>
            <Card.Text>Products: {orderDetails.products.map(product => product.name).join(', ')}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default OrderStatus;

