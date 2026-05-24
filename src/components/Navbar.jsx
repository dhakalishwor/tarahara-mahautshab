import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isAdmin = user && user.role === 'admin';

  // Helper to check active admin tab from URL
  const getAdminTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'restaurants';
  };

  // ─── ADMIN NAVBAR ────────────────────────────────────────────
  if (isAdmin) {
    const currentTab = getAdminTab();
    return (
      <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Admin Logo */}
            <Link to="/admin?tab=restaurants" className="flex items-center gap-2 group">
              <div className="bg-primary text-gray-900 w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-all">
                A
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight hidden sm:block">Admin Panel</span>
            </Link>

            {/* Admin Navigation Tabs */}
            <div className="flex items-center gap-2">
              <Link
                to="/admin?tab=restaurants"
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  currentTab === 'restaurants' 
                    ? 'bg-yellow-400 text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🏪 Restaurants
              </Link>
              <Link
                to="/admin?tab=food"
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  currentTab === 'food' 
                    ? 'bg-yellow-400 text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                🍽️ Food Items
              </Link>
              <Link
                to="/admin?tab=orders"
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${
                  currentTab === 'orders' 
                    ? 'bg-yellow-400 text-black shadow-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                📦 Orders
              </Link>
            </div>

            {/* Admin User Info + Logout */}
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm hidden lg:block">
                <span className="text-white font-bold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all border border-red-500/30"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ─── CUSTOMER / GUEST NAVBAR ─────────────────────────────────
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary text-gray-900 p-2.5 rounded-full shadow-sm group-hover:bg-primary-dark group-hover:scale-105 transition-all duration-300">
              <span className="text-2xl">🍔</span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Food Delivery
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">

            <div className="hidden md:flex items-center gap-8 mr-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary-dark transition-colors duration-300 font-semibold"
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                className="text-gray-600 hover:text-primary-dark transition-colors duration-300 font-semibold"
              >
                Restaurants
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary-dark transition-colors duration-300 font-semibold"
              >
                Contact
              </Link>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative group flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
              <span className="text-xl">🛒</span>
              <span className="font-semibold text-gray-700 hidden sm:block">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
                <div className="hidden lg:flex items-center gap-5">
                  <span className="text-gray-500 text-sm font-medium">
                    Welcome, <span className="text-gray-900 font-bold">{user.name}</span>
                  </span>

                  <Link
                    to="/orders"
                    className="text-gray-600 hover:text-primary-dark transition-colors font-semibold"
                  >
                    Orders
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 font-semibold text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-dark transition-colors font-semibold px-2"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-primary text-gray-900 px-6 py-2.5 rounded-full hover:bg-primary-dark active:scale-95 transition-all duration-300 font-bold shadow-sm"
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