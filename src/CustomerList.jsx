

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Customers</h2>
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
    </div>
  );
};

export default CustomerList;




