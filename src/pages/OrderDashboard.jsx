import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'on-the-way': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">Login to view your orders</p>
          <Link to="/login" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start ordering delicious food!</p>
          <Link to="/restaurants" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-orange-600">Your Orders</h1>
        
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
                  <p className="text-gray-600">{new Date(order.date).toLocaleString()}</p>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600 text-sm ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">NPR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-orange-600">NPR {order.total + 50}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}