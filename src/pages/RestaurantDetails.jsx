import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const restaurantsData = {
  1: {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '30-40 min',
    minOrder: 500,
    menu: [
      { id: 101, name: 'Margherita Pizza', price: 550, description: 'Fresh mozzarella, tomato sauce, basil' },
      { id: 102, name: 'Pepperoni Pizza', price: 650, description: 'Pepperoni, mozzarella, tomato sauce' },
      { id: 103, name: 'Vegetarian Pizza', price: 600, description: 'Bell peppers, onions, mushrooms, olives' },
      { id: 104, name: 'BBQ Chicken Pizza', price: 750, description: 'BBQ sauce, chicken, onions, cilantro' },
    ]
  },
  2: {
    id: 2,
    name: 'Sushi World',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '25-35 min',
    minOrder: 800,
    menu: [
      { id: 201, name: 'California Roll', price: 650, description: 'Crab, avocado, cucumber' },
      { id: 202, name: 'Salmon Nigiri', price: 850, description: 'Fresh salmon over rice' },
      { id: 203, name: 'Tuna Sashimi', price: 950, description: 'Fresh tuna slices' },
      { id: 204, name: 'Dragon Roll', price: 1200, description: 'Eel, cucumber, avocado' },
    ]
  },
  3: {
    id: 3,
    name: 'Burger Hub',
    cuisine: 'American',
    rating: 4.3,
    deliveryTime: '20-30 min',
    minOrder: 300,
    menu: [
      { id: 301, name: 'Classic Burger', price: 350, description: 'Beef patty, lettuce, tomato, cheese' },
      { id: 302, name: 'Cheese Burger', price: 400, description: 'Double cheese, beef patty' },
      { id: 303, name: 'Chicken Burger', price: 380, description: 'Crispy chicken, mayo, lettuce' },
      { id: 304, name: 'Veggie Burger', price: 320, description: 'Vegetable patty, special sauce' },
    ]
  },
};

export default function RestaurantDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState('');
  
  const restaurant = restaurantsData[id];

  if (!restaurant) {
    return (
      <div className="w-full min-h-screen bg-brown-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Restaurant Not Found</h2>
          <Link to="/restaurants" className="text-brown-700 font-semibold hover:underline">Back to Restaurants</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (item) => {
    addToCart({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name });
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-brown-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/restaurants" className="text-brown-700 font-semibold hover:underline mb-4 inline-block">&larr; Back to Restaurants</Link>
        
        {notification && (
          <div className="bg-green-50 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {notification}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-brown-200">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{restaurant.name}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <span>{restaurant.cuisine} Cuisine</span>
            <span>⭐ {restaurant.rating}</span>
            <span>🕒 {restaurant.deliveryTime}</span>
            <span>Min Order: NPR {restaurant.minOrder}</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6 text-gray-900">Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition p-6 border-2 border-brown-200">
              <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-brown-700">NPR {item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-brown-700 text-white px-6 py-2 rounded-lg hover:bg-brown-800 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
