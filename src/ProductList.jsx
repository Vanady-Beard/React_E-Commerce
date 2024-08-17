import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Modal } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
        await axios.put(`http://localhost:5000/api/products/${currentProductId}`, formData);
        setModalMessage('Product updated successfully!');
        setProducts(products.map(product => product.productID === currentProductId ? { ...formData, productID: currentProductId } : product));
      } else {
        const response = await axios.post('http://localhost:5000/api/products', formData);
        setModalMessage('Product added successfully!');
        setProducts([...products, { ...formData, productID: response.data.productID }]);
      }
      setShow(true);
      setFormData({ name: '', price: '', description: '' });
      setIsEditing(false);
      setCurrentProductId(null);
    } catch (err) {
      console.error('Failed to add/update product:', err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(product => product.productID !== id));
      setModalMessage('Product deleted successfully!');
      setShow(true);
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const editProduct = (product) => {
    setIsEditing(true);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setCurrentProductId(product.productID);
  };

  const handleClose = () => setShow(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-center" style={{ color: 'hotpink' }}>Products</h2>

      <Form onSubmit={handleSubmit} className="mt-4">
        <h4>{isEditing ? 'Edit Product' : 'Add New Product'}</h4>
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
        <Form.Group controlId="formPrice" className="mt-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}>
          {isEditing ? 'Save Changes' : 'Add Product'}
        </Button>
      </Form>

      <div className="d-flex flex-wrap justify-content-around mt-4">
        {products.map((product) => (
          <Card
            key={product.productID}
            style={{ width: '18rem', margin: '10px', borderColor: 'hotpink' }}
          >
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
              <Card.Text>Description: {product.description}</Card.Text>
              <Link to={`/product/${product.productID}`}>
                <Button variant="outline-primary" style={{ borderColor: 'hotpink', color: 'hotpink' }}>
                  View Details
                </Button>
              </Link>
              <Button
                variant="outline-primary"
                style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}
                onClick={() => editProduct(product)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                style={{ borderColor: 'hotpink', color: 'hotpink', marginTop: '10px' }}
                onClick={() => deleteProduct(product.productID)}
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

export default ProductList;





