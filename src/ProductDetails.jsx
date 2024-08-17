import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      navigate('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found</div>;

  return (
    <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
      <Card.Body>
        <Card.Title style={{ color: 'hotpink' }}>{product.name}</Card.Title>
        <Card.Text>Description: {product.description}</Card.Text>
        <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
        <Button
          variant="outline-danger"
          style={{ borderColor: 'hotpink', color: 'hotpink' }}
          onClick={deleteProduct}
        >
          Delete Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;





