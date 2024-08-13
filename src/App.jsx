
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomerList from "./CustomerList";
import CustomerDetails from "./CustomerDetails";
import ProductList from "./ProductList";
import ProductDetails from "./ProductDetails";
import OrderList from "./0rderList";
import NavigationBar from "./NavigationBar";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to the E-commerce Platform</h1>
      <p className="lead">Explore our sections:</p>
      <div className="d-flex justify-content-center">
        <a href="/customers" className="btn btn-primary m-2">
          View Customers
        </a>
        <a href="/products" className="btn btn-success m-2">
          View Products
        </a>
        <a href="/orders" className="btn btn-info m-2">
          View Orders
        </a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="container">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customer/:id" element={<CustomerDetails />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
