import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse());
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = allOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders.reverse());
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">This page is for administrators only</p>
          <Link to="/" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-orange-600">Admin Panel</h1>
        
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'orders' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Orders Management
          </button>
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'restaurants' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Restaurants
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'users' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Users
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
                      <p className="text-gray-600">{new Date(order.date).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">NPR {order.total + 50}</p>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="mt-2 p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="preparing">Preparing</option>
                        <option value="on-the-way">On the Way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Items:</h4>
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center py-1">
                        <span>{item.name} x{item.quantity}</span>
                        <span>NPR {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'restaurants' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Restaurant Management</h2>
            <p className="text-gray-600 mb-4">Manage restaurant listings, menus, and availability</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Pizza Palace</h3>
                <p className="text-sm text-gray-600 mb-2">Italian Cuisine</p>
                <button className="text-orange-600 hover:underline">Edit Details</button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Sushi World</h3>
                <p className="text-sm text-gray-600 mb-2">Japanese Cuisine</p>
                <button className="text-orange-600 hover:underline">Edit Details</button>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Burger Hub</h3>
                <p className="text-sm text-gray-600 mb-2">American Cuisine</p>
                <button className="text-orange-600 hover:underline">Edit Details</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <p className="text-gray-600 mb-4">View and manage user accounts</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Role</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Admin User</td>
                    <td className="p-3">admin@example.com</td>
                    <td className="p-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded">Admin</span></td>
                    <td className="p-3"><button className="text-orange-600 hover:underline">Edit</button></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Delivery Person</td>
                    <td className="p-3">delivery@example.com</td>
                    <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Delivery</span></td>
                    <td className="p-3"><button className="text-orange-600 hover:underline">Edit</button></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Customer</td>
                    <td className="p-3">customer@example.com</td>
                    <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">Customer</span></td>
                    <td className="p-3"><button className="text-orange-600 hover:underline">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}