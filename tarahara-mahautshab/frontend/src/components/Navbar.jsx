import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-orange-600">
        <Link to="/">Tarahara Utsav</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-orange-600">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-600">About</Link>
        <Link to="/contact" className="text-gray-700 hover:text-orange-600">Contact</Link>
        <Link to="/sponsors" className="text-gray-700 hover:text-orange-600">Sponsors</Link>
        <Link to="/login" className="text-gray-700 hover:text-orange-600">Login</Link>
        <Link to="/register" className="text-gray-700 hover:text-orange-600">Register</Link>
      </div>
    </nav>
  );
}