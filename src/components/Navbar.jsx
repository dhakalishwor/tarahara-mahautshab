import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <nav className="bg-gradient-to-r from-brown-900 to-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-brown-700 p-2 rounded-lg group-hover:bg-brown-600 transition">
              <span className="text-3xl">🍔</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Food Delivery</h1>
              <p className="text-brown-300 text-xs">Fast & Delicious</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-brown-300 transition font-medium hidden md:block">
              Home
            </Link>
            <Link to="/restaurants" className="text-white hover:text-brown-300 transition font-medium hidden md:block">
              Restaurants
            </Link>
            <Link to="/contact" className="text-white hover:text-brown-300 transition font-medium hidden md:block">
              Contact
            </Link>
            
            <Link to="/cart" className="relative group">
              <div className="bg-brown-700 p-2 rounded-lg group-hover:bg-brown-600 transition">
                <span className="text-2xl">🛒</span>
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brown-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-black">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-brown-200 text-sm">Welcome, <span className="text-white font-semibold">{user.name}</span></span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-white hover:text-brown-300 transition font-medium">
                      Admin
                    </Link>
                  )}
                  {user.role === 'delivery' && (
                    <Link to="/delivery" className="text-white hover:text-brown-300 transition font-medium">
                      Deliveries
                    </Link>
                  )}
                  <Link to="/orders" className="text-white hover:text-brown-300 transition font-medium">
                    Orders
                  </Link>
                </div>
                <button 
                  onClick={logout} 
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-white hover:text-brown-300 transition font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-brown-700 text-white px-5 py-2 rounded-lg hover:bg-brown-600 transition font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}