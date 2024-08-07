// src/CustomerDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const CustomerDetails = () => {
  const { id } = useParams();
  const customers = [
    { id: 1, name: 'Alice Wonderland', email: 'alice@wonderland.com', phone: '123-456-7890' },
    { id: 2, name: 'Cinderella Charming', email: 'cinderella@charming.com', phone: '234-567-8901' },
    { id: 3, name: 'Belle Beauty', email: 'belle@beauty.com', phone: '345-678-9012' },
  ];
  const customer = customers.find((customer) => customer.id === parseInt(id, 10));

  if (!customer) return <div>Customer not found</div>;

  return (
    <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
      <Card.Body>
        <Card.Title style={{ color: 'hotpink' }}>{customer.name}</Card.Title>
        <Card.Text>Email: {customer.email}</Card.Text>
        <Card.Text>Phone: {customer.phone}</Card.Text>
        <Button variant="outline-danger" style={{ borderColor: 'hotpink', color: 'hotpink' }}>
          Delete Customer
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomerDetails;

