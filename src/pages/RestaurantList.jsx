import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const allRestaurants = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian', category: 'Pizza', rating: 4.5, deliveryTime: '30-40 min', minOrder: 500 },
  { id: 2, name: 'Sushi World', cuisine: 'Japanese', category: 'Sushi', rating: 4.8, deliveryTime: '25-35 min', minOrder: 800 },
  { id: 3, name: 'Burger Hub', cuisine: 'American', category: 'Burger', rating: 4.3, deliveryTime: '20-30 min', minOrder: 300 },
  { id: 4, name: 'Dragon Wok', cuisine: 'Chinese', category: 'Chinese', rating: 4.6, deliveryTime: '35-45 min', minOrder: 600 },
  { id: 5, name: 'Spice Route', cuisine: 'Indian', category: 'Indian', rating: 4.7, deliveryTime: '30-40 min', minOrder: 500 },
  { id: 6, name: 'Sweet Dreams', cuisine: 'Bakery', category: 'Dessert', rating: 4.9, deliveryTime: '15-25 min', minOrder: 250 },
];

export default function RestaurantList() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [filteredRestaurants, setFilteredRestaurants] = useState(allRestaurants);

  const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Chinese', 'Indian', 'Dessert'];

  useEffect(() => {
    let results = allRestaurants;

    if (selectedCategory !== 'All') {
      results = results.filter(r => r.category === selectedCategory);
    }

    if (searchTerm) {
      results = results.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRestaurants(results);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full min-h-screen bg-brown-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">All Restaurants</h1>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600"
          />
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border-2 border-brown-200 rounded-lg focus:outline-none focus:border-brown-600 bg-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {filteredRestaurants.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No restaurants found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <Link 
                key={restaurant.id} 
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition overflow-hidden border-2 border-brown-200"
              >
                <div className="h-48 bg-gradient-to-br from-brown-400 to-brown-700 flex items-center justify-center">
                  <span className="text-8xl">
                    {restaurant.category === 'Pizza' ? '🍕' : 
                     restaurant.category === 'Burger' ? '🍔' :
                     restaurant.category === 'Sushi' ? '🍣' :
                     restaurant.category === 'Chinese' ? '🥡' :
                     restaurant.category === 'Indian' ? '🍛' : '🍰'}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-brown-700 font-semibold">⭐ {restaurant.rating}</span>
                    <span className="text-gray-500 text-sm">{restaurant.deliveryTime}</span>
                  </div>
                  <p className="text-gray-500 text-sm">Min Order: NPR {restaurant.minOrder}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}