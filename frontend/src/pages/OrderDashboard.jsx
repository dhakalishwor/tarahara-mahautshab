import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';

export default function OrderDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
      // Auto-refresh every 10 seconds to get updated status
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Preparing': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Out for Delivery': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return '⏳';
      case 'Preparing': return '👨‍🍳';
      case 'Out for Delivery': return '🛵';
      case 'Delivered': return '✅';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-6xl mb-6">🔐</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Please Login</h2>
          <p className="text-gray-500 mb-8">Login to view your orders</p>
          <Link to="/login" className="inline-block bg-primary text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors w-full shadow-sm">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading && orders.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-8xl mb-6 opacity-80">📦</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">No Orders Yet</h2>
          <p className="text-gray-500 mb-8">Start ordering delicious food!</p>
          <Link to="/restaurants" className="inline-block bg-primary text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors w-full shadow-sm">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Orders</h1>
          <button 
            onClick={fetchOrders}
            className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm border border-gray-200 shadow-sm"
          >
            ↻ Refresh
          </button>
        </div>
        
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                  <p className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <span className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 ${getStatusColor(order.status)}`}>
                  <span>{getStatusIcon(order.status)}</span>
                  {order.status}
                </span>
              </div>
              
              {/* Order Items */}
              <div className="p-5">
                <div className="space-y-3">
                  {order.items && order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold rounded-md px-2 py-1 border border-gray-200">
                          x{item.quantity}
                        </span>
                        <div>
                          <span className="font-semibold text-gray-900">{item.menu_item_name}</span>
                          <span className="text-gray-500 text-sm ml-2">({item.restaurant_name})</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900">NPR {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex justify-between items-center p-5 border-t border-gray-100 bg-gray-50/50">
                <div className="text-sm text-gray-500">
                  <p>📍 {order.delivery_address}</p>
                  {order.phone && <p className="mt-1">📞 {order.phone}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-extrabold text-gray-900">NPR {order.total_amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}