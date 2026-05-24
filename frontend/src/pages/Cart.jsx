import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 50;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckout(true);
  };

  if (user && user.role !== 'customer') {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-6xl mb-6 opacity-80">🚫</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Restricted Area</h2>
          <p className="text-gray-500 mb-8">Administrators and delivery personnel cannot place orders.</p>
          <Link to="/" className="inline-block bg-primary text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors w-full shadow-sm">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address || !phone) {
      alert("Please provide both delivery address and phone number.");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const orderData = {
        total_amount: getTotalPrice() + deliveryFee,
        delivery_address: address,
        phone: phone,
        special_instructions: specialInstructions,
        items: cartItems.map(item => ({
          menu_item_id: null,
          restaurant_name: item.restaurantName || 'Unknown',
          menu_item_name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await orderService.create(orderData);
      
      clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-8xl mb-6 opacity-80">🛒</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any delicious food to your cart yet.</p>
          <Link to="/restaurants" className="inline-block bg-primary text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors w-full shadow-sm">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Your Order</h1>
            <span className="text-gray-500 font-medium">{cartItems.length} items</span>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {cartItems.map((item, index) => (
              <div key={item.id} className={`flex items-center justify-between p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                
                <div className="flex items-start gap-4 flex-1">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover hidden sm:block border border-gray-100" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 hidden sm:flex items-center justify-center text-2xl border border-gray-200">🍽️</div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-1">{item.restaurantName}</p>
                    <p className="text-gray-900 font-semibold">NPR {item.price}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-8">
                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="font-bold w-10 text-center text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-extrabold text-lg text-gray-900 w-24 text-right">
                      NPR {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      title="Remove Item"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">NPR {getTotalPrice()}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-gray-900">NPR {deliveryFee}</span>
              </div>
              <div className="border-t border-gray-100 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900">NPR {getTotalPrice() + deliveryFee}</span>
              </div>
            </div>
            
            {!showCheckout ? (
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-primary-dark transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <span>&rarr;</span>
              </button>
            ) : (
              <div className="space-y-4 animate-fadeIn border-t border-gray-100 pt-6 mt-2">
                <h3 className="font-bold text-gray-900 mb-2">Delivery Details</h3>
                <input
                  type="text"
                  placeholder="Delivery Address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3.5 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3.5 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50"
                  required
                />
                <textarea
                  placeholder="Special Instructions (optional)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full p-3.5 border border-gray-200 rounded-lg h-24 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-gray-50 resize-none"
                />
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition-all font-bold text-lg shadow-md active:scale-95 mt-4 disabled:opacity-70"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}