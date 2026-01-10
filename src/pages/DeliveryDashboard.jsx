import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const activeDeliveries = allOrders.filter(order => 
      order.status === 'preparing' || order.status === 'on-the-way'
    );
    setDeliveries(activeDeliveries);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    const activeDeliveries = updatedOrders.filter(order => 
      order.status === 'preparing' || order.status === 'on-the-way'
    );
    setDeliveries(activeDeliveries);
  };

  if (!user || user.role !== 'delivery') {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">This page is for delivery personnel only</p>
          <Link to="/" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (deliveries.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">No Active Deliveries</h2>
          <p className="text-gray-600">All deliveries completed!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-orange-600">Delivery Dashboard</h1>
        
        <div className="space-y-6">
          {deliveries.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
                  <p className="text-gray-600">{new Date(order.date).toLocaleString()}</p>
                  <span className={`inline-block mt-2 px-4 py-1 rounded-full font-semibold ${
                    order.status === 'preparing' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {order.status === 'preparing' ? 'Preparing' : 'On the Way'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">NPR {order.total + 50}</p>
                </div>
              </div>
              
              <div className="border-t pt-4 mb-4">
                <h4 className="font-semibold mb-3">Items:</h4>
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-1">
                    <span>{item.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4">
                {order.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'on-the-way')}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Mark as Out for Delivery
                  </button>
                )}
                {order.status === 'on-the-way' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}