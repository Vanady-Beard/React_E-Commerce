import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders(orders.filter(order => order.orderID !== id));
    } catch (err) {
      console.error('Failed to cancel order:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Orders</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {orders.map((order) => (
          <Card
            key={order.orderID}
            style={{ width: '18rem', margin: '10px', borderColor: 'hotpink' }}
          >
            <Card.Body>
              <Card.Title>Order #{order.orderID}</Card.Title>
              <Card.Text>Customer: {order.customerName}</Card.Text>
              <Card.Text>Order Date: {order.orderDate}</Card.Text>
              <Button
                variant="outline-danger"
                style={{ borderColor: 'hotpink', color: 'hotpink' }}
                onClick={() => cancelOrder(order.orderID)}
              >
                Cancel Order
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderList;


