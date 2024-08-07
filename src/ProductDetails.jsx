// src/ProductDetails.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const products = [
    { id: 1, name: 'Pink Lipstick', price: 9.99, description: 'A beautiful pink lipstick that lasts all day.' },
    { id: 2, name: 'Rose Perfume', price: 19.99, description: 'A floral perfume with hints of rose.' },
    { id: 3, name: 'Peach Blush', price: 7.99, description: 'A peachy blush for a natural glow.' },
  ];
  const product = products.find((product) => product.id === parseInt(id, 10));

  if (!product) return <div>Product not found</div>;

  return (
    <Card style={{ width: '24rem', margin: '20px auto', borderColor: 'hotpink' }}>
      <Card.Body>
        <Card.Title style={{ color: 'hotpink' }}>{product.name}</Card.Title>
        <Card.Text>Description: {product.description}</Card.Text>
        <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
        <Button variant="outline-danger" style={{ borderColor: 'hotpink', color: 'hotpink' }}>
          Delete Product
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;

