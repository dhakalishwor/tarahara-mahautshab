import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Pizza', icon: '🍕', color: 'bg-brown-100' },
  { name: 'Burger', icon: '🍔', color: 'bg-brown-200' },
  { name: 'Sushi', icon: '🍣', color: 'bg-brown-100' },
  { name: 'Chinese', icon: '🥡', color: 'bg-brown-200' },
  { name: 'Indian', icon: '🍛', color: 'bg-brown-100' },
  { name: 'Dessert', icon: '🍰', color: 'bg-brown-200' },
];

const featuredRestaurants = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian', rating: 4.5, deliveryTime: '30-40 min', image: '🍕' },
  { id: 2, name: 'Sushi World', cuisine: 'Japanese', rating: 4.8, deliveryTime: '25-35 min', image: '🍣' },
  { id: 3, name: 'Burger Hub', cuisine: 'American', rating: 4.3, deliveryTime: '20-30 min', image: '🍔' },
];

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-gradient-to-r from-brown-900 via-brown-800 to-black text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4">Order Food Online</h1>
          <p className="text-xl mb-8 text-brown-200">Delicious food from your favorite restaurants, delivered fast!</p>
          <Link to="/restaurants" className="inline-block bg-brown-600 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-brown-700 transition font-semibold text-lg">
            Browse Restaurants
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <Link key={idx} to={`/restaurants?category=${cat.name}`} className={`${cat.color} p-6 rounded-lg text-center hover:shadow-xl transition cursor-pointer border-2 border-brown-300`}>
              <div className="text-5xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-gray-800">{cat.name}</div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-brown-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Featured Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map(restaurant => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden border-2 border-brown-200">
                <div className="h-48 bg-gradient-to-br from-brown-400 to-brown-700 flex items-center justify-center text-8xl">
                  {restaurant.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-brown-700 font-semibold">⭐ {restaurant.rating}</span>
                    <span className="text-gray-500 text-sm">{restaurant.deliveryTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-black via-brown-900 to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            <div className="bg-brown-800 p-8 rounded-lg">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-semibold mb-3">Choose Location</h3>
              <p className="text-brown-200">Enter your delivery address</p>
            </div>
            <div className="bg-brown-800 p-8 rounded-lg">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-semibold mb-3">Select Food</h3>
              <p className="text-brown-200">Browse menus and add to cart</p>
            </div>
            <div className="bg-brown-800 p-8 rounded-lg">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-brown-200">Get your food delivered hot</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}