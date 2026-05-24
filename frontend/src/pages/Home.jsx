import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Pizza', icon: '🍕', color: 'bg-white' },
  { name: 'Burger', icon: '🍔', color: 'bg-white' },
  { name: 'Sushi', icon: '🍣', color: 'bg-white' },
  { name: 'Chinese', icon: '🥡', color: 'bg-white' },
  { name: 'Indian', icon: '🍛', color: 'bg-white' },
  { name: 'Dessert', icon: '🍰', color: 'bg-white' },
  { name: 'Healthy', icon: '🥗', color: 'bg-white' },
  { name: 'Drinks', icon: '🥤', color: 'bg-white' },
];

const featuredRestaurants = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian • Pizza', rating: 4.5, deliveryTime: '30 min', minOrder: '$10', image: 'https://images.unsplash.com/photo-1604381536136-57f992014df5?auto=format&fit=crop&w=600&q=80', isPromoted: true },
  { id: 2, name: 'Sushi World', cuisine: 'Japanese • Sushi', rating: 4.8, deliveryTime: '45 min', minOrder: '$15', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', isPromoted: false },
  { id: 3, name: 'Burger Hub', cuisine: 'American • Fast Food', rating: 4.3, deliveryTime: '25 min', minOrder: '$5', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', isPromoted: true },
  { id: 4, name: 'Curry House', cuisine: 'Indian • Curry', rating: 4.6, deliveryTime: '35 min', minOrder: '$12', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', isPromoted: false },
  { id: 5, name: 'Dragon Wok', cuisine: 'Chinese • Noodles', rating: 4.2, deliveryTime: '30 min', minOrder: '$10', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80', isPromoted: false },
  { id: 6, name: 'Sweet Treats', cuisine: 'Desserts • Bakery', rating: 4.9, deliveryTime: '20 min', minOrder: '$5', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80', isPromoted: false },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        
        <div className="relative z-10 w-full max-w-4xl px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Order food from the widest range of restaurants.
          </h1>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row bg-white rounded-lg p-2 shadow-2xl max-w-3xl mx-auto">
            <div className="flex-grow flex items-center px-4 py-3 sm:py-0">
              <span className="text-gray-400 text-xl mr-3">🔍</span>
              <input 
                type="text" 
                placeholder="Restaurant or cuisine" 
                className="w-full text-lg outline-none text-gray-800 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="bg-primary text-gray-900 font-bold text-lg px-8 py-3 sm:py-4 rounded-md hover:bg-primary-dark transition-colors mt-2 sm:mt-0"
            >
              Find Food
            </button>
          </form>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-800">What are you craving?</h2>
        </div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/restaurants?category=${cat.name}`} 
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className={`${cat.color} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-primary group-hover:-translate-y-1 transition-all duration-300 mb-3`}>
                {cat.icon}
              </div>
              <span className="font-medium text-sm text-gray-700 group-hover:text-gray-900">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <div className="max-w-7xl mx-auto pb-20 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Restaurants</h2>
          <Link to="/restaurants" className="text-primary-dark font-bold hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map(restaurant => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100 group">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {restaurant.isPromoted && (
                  <div className="absolute top-4 left-4 bg-primary text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-sm">
                    PROMOTED
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold flex items-center gap-1 shadow-sm">
                  <span className="text-yellow-500">★</span> {restaurant.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{restaurant.name}</h3>
                <p className="text-gray-500 text-sm mb-4 truncate">{restaurant.cuisine}</p>
                
                <div className="flex items-center text-sm text-gray-600 gap-4 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-70">⏱</span>
                    <span className="font-medium">{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-70">💰</span>
                    <span className="font-medium">Min {restaurant.minOrder}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* App Promo / How it works */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get the best experience with our app
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Order your favorite food directly from your phone. Track deliveries in real-time and get exclusive offers.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <span className="text-2xl">🍎</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
                  <span className="text-2xl">▶️</span>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-64 h-[500px] bg-gray-100 rounded-[3rem] border-8 border-gray-900 shadow-2xl relative overflow-hidden flex items-center justify-center">
                 <div className="text-6xl">📱</div>
                 <div className="absolute top-0 w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}