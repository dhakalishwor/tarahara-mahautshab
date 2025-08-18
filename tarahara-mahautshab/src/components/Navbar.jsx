import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow px-4 py-4"> {/* Added w-full and adjusted padding */}
      <div className="max-w-7xl mx-auto flex items-center justify-between"> {/* Added max-w-7xl and mx-auto for content centering */}
        <div className="text-orange-600 font-bold text-xl">
          <Link to="/">Tarahara Utsav</Link>
        </div>
        <div className="space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-600 font-medium">Contact</Link>
          <Link to="/sponsors" className="text-gray-700 hover:text-orange-600 font-medium">Sponsors</Link>
          <Link to="/login" className="text-gray-700 hover:text-orange-600 font-medium">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-orange-600 font-medium">Register</Link>
        </div>
      </div>
    </nav>
  );
}
