import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      // Show orders that are active (not delivered or cancelled)
      const active = data.filter(
        (o) => o.status === 'Preparing' || o.status === 'Out for Delivery'
      );
      setDeliveries(active);
    } catch (err) {
      console.error('Error fetching deliveries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === 'delivery_person') {
      fetchDeliveries();
      const interval = setInterval(fetchDeliveries, 15000);
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user || user.role !== 'delivery_person') {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Access Denied</h2>
          <p className="text-gray-500 mb-8">This dashboard is for delivery personnel only.</p>
          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition-colors w-full shadow-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (deliveries.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">No Active Deliveries</h2>
          <p className="text-gray-500">All caught up! Check back soon for new orders.</p>
          <button
            onClick={fetchDeliveries}
            className="mt-6 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            ↻ Refresh
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (status === 'Preparing') return 'bg-blue-100 text-blue-800 border border-blue-200';
    if (status === 'Out for Delivery') return 'bg-purple-100 text-purple-800 border border-purple-200';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Delivery Dashboard</h1>
          <button
            onClick={fetchDeliveries}
            className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm border border-gray-200 shadow-sm"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="space-y-6">
          {deliveries.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Order #{(order._id || order.id)?.toString().slice(-6).toUpperCase()}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-full font-bold text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              {/* Items */}
              <div className="p-5">
                <h4 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                  Items
                </h4>
                <div className="space-y-2">
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-800">
                        <span className="font-bold text-gray-500 mr-2">x{item.quantity}</span>
                        {item.menu_item_name}
                        <span className="text-gray-400 ml-1">({item.restaurant_name})</span>
                      </span>
                      <span className="font-semibold text-gray-900">
                        NPR {item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center p-5 border-t border-gray-100 bg-gray-50/50">
                <div className="text-sm text-gray-500">
                  <p>📍 {order.delivery_address}</p>
                  {order.phone && <p className="mt-1">📞 {order.phone}</p>}
                </div>
                <p className="text-xl font-extrabold text-gray-900">NPR {order.total_amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
