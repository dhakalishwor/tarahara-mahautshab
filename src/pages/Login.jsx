import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const userData = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : email.includes('delivery') ? 'delivery' : 'customer'
    };

    login(userData);
    localStorage.setItem('token', 'demo-token-' + Date.now());
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-brown-50 to-brown-100 py-12 px-4">
      <div className="max-w-md w-full p-8 bg-white shadow-2xl rounded-xl border-2 border-brown-200">
        <div className="text-center mb-8">
          <div className="inline-block bg-brown-700 p-4 rounded-full mb-4">
            <span className="text-5xl">🍔</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600" 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600" 
            />
          </div>
          <button type="submit" className="w-full bg-brown-700 text-white p-3 rounded-lg hover:bg-brown-800 transition font-semibold text-lg shadow-lg">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account? <Link to="/register" className="text-brown-700 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}