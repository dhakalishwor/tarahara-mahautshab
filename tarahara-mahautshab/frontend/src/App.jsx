import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import RestaurantList from './pages/RestaurantList';
import Cart from './pages/Cart';
import OrderDashboard from './pages/OrderDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderDashboard />} />
        <Route path="/delivery" element={<DeliveryDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
