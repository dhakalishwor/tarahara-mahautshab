import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { restaurantService } from '../services/restaurantService';

export default function RestaurantList() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await restaurantService.getAll();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  // Get unique cuisines from DB data
  const cuisines = ['All', ...new Set(restaurants.map(r => r.cuisine))];

  const filteredRestaurants = restaurants.filter(r => {
    const matchesCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;
    const matchesSearch = !searchTerm ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">All Restaurants</h1>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex-1 flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <span className="text-gray-400 mr-2">🔍</span>
            <input 
              type="text" 
              placeholder="Search restaurants or cuisines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-gray-700 bg-transparent"
            />
          </div>
          
          <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all bg-white min-w-[200px]">
            <span className="text-gray-400 mr-2">🍽️</span>
            <select 
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full outline-none text-gray-700 bg-transparent cursor-pointer"
            >
              {cuisines.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No restaurants found</h2>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCuisine('All'); }}
              className="mt-6 text-primary-dark font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map(restaurant => (
              <Link 
                key={restaurant.id} 
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  {restaurant.image ? (
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-4xl">🏪</div>
                  )}
                  {!restaurant.is_active && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                      CLOSED
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-1">{restaurant.cuisine}</p>
                  
                  <div className="mt-auto flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
                    <span className="font-medium">{restaurant.address}</span>
                    <span className="font-medium">{restaurant.menu_items_count || restaurant.menu_items?.length || 0} items</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}