import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const userData = await login(email, password);
      // Redirect based on role
      if (userData?.user?.role === 'admin') {
        navigate('/admin');
      } else if (userData?.user?.role === 'delivery') {
        navigate('/delivery');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-md w-full p-8 bg-white shadow-sm border border-gray-100 rounded-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-gray-900 rounded-full mb-4 shadow-sm">
            <span className="text-3xl">🍔</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="text-gray-500 mt-2 text-sm">Login to order your favorite food</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold text-sm mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
               <label className="block text-gray-700 font-bold text-sm">Password</label>
               <a href="#" className="text-xs text-primary-dark font-semibold hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" 
            />
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-800 transition-all font-bold shadow-md active:scale-[0.98] mt-2">
            Login
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? <Link to="/register" className="text-primary-dark font-bold hover:underline ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}