import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(),
      items: cartItems,
      total: getTotalPrice(),
      status: 'pending',
      date: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    clearCart();
    navigate('/orders');
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-brown-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
          <Link to="/restaurants" className="bg-brown-700 text-white px-6 py-3 rounded-lg hover:bg-brown-800 transition">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-brown-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Your Cart</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.restaurantName}</p>
                <p className="text-brown-700 font-semibold">NPR {item.price}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-semibold w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                
                <span className="font-bold text-lg w-24 text-right">
                  NPR {item.price * item.quantity}
                </span>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-700 ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Subtotal:</span>
            <span className="text-2xl font-bold text-brown-700">NPR {getTotalPrice()}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-gray-600">
            <span>Delivery Fee:</span>
            <span>NPR 50</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center mb-6">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-3xl font-bold text-brown-700">NPR {getTotalPrice() + 50}</span>
          </div>
          
          {!showCheckout ? (
            <button
              onClick={handleCheckout}
              className="w-full bg-brown-700 text-white py-3 rounded-lg hover:bg-brown-800 transition font-semibold text-lg"
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Delivery Address"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Special Instructions (optional)"
                className="w-full p-3 border border-gray-300 rounded-lg h-24"
              />
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
              >
                Place Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}