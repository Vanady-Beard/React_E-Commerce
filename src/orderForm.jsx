import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';

const OrderForm = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ customerID: '', productID: '', orderDate: '' });
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchCustomersAndProducts = async () => {
      try {
        const customersResponse = await axios.get('http://localhost:5000/api/customers');
        setCustomers(customersResponse.data);
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productsResponse.data);
      } catch (err) {
        console.error('Failed to fetch customers/products:', err);
      }
    };

    fetchCustomersAndProducts();
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
      await axios.post('http://localhost:5000/api/orders', formData);
      setModalMessage('Order placed successfully!');
      setShow(true);
      setFormData({ customerID: '', productID: '', orderDate: '' });
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Place Order</h2>

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="formCustomerID">
          <Form.Label>Customer</Form.Label>
          <Form.Control
            as="select"
            name="customerID"
            value={formData.customerID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.customerID} value={customer.customerID}>
                {customer.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProductID" className="mt-3">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            name="productID"
            value={formData.productID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.productID} value={product.productID}>
                {product.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formOrderDate" className="mt-3">
          <Form.Label>Order Date</Form.Label>
          <Form.Control
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}>
          Place Order
        </Button>
      </Form>

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

export default OrderForm;

