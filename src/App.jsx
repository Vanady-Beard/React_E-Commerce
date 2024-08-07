import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// Home component for the landing page
const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to the E-commerce Platform</h1>
      <p className="lead">Explore our sections:</p>
      <div className="d-flex justify-content-center">
        <Link to="/customers" className="btn btn-primary m-2">
          View Customers
        </Link>
        <Link to="/products" className="btn btn-success m-2">
          View Products
        </Link>
        <Link to="/orders" className="btn btn-info m-2">
          View Orders
        </Link>
      </div>
    </div>
  );
};

// Component to display customers
const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/customers")
      .then((response) => {
        console.log("Fetched customers:", response.data); // Debug log
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Customers</h2>
      <ul className="list-group">
        {customers.map((customer) => (
          <li key={customer.customerID} className="list-group-item">
            <strong>{customer.name}</strong> - {customer.email} - {customer.phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to display products
const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/products")
      .then((response) => {
        console.log("Fetched products:", response.data); // Debug log
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Products</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.productID} className="list-group-item">
            <strong>{product.name}</strong> - ${product.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component to display orders
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/orders")
      .then((response) => {
        console.log("Fetched orders:", response.data); // Debug log
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Orders</h2>
      <ul className="list-group">
        {orders.map((order) => (
          <li key={order.orderID} className="list-group-item">
            <strong>Order #{order.orderID}</strong> by {order.customerName} on{" "}
            {order.orderDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App component with routing
const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            E-commerce Platform
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



