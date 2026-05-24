import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { restaurantService, menuItemService } from '../services/restaurantService';

export default function RestaurantDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [notification, setNotification] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const restData = await restaurantService.getById(id);
        setRestaurant(restData);
        const menuData = await menuItemService.getAll(id);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart({ ...item, restaurantId: restaurant.id, restaurantName: restaurant.name });
    setNotification(`${item.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full mx-4">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-2xl font-bold mb-3 text-gray-900">Restaurant Not Found</h2>
          <p className="text-gray-500 mb-8">This restaurant may have been removed.</p>
          <Link to="/restaurants" className="inline-block bg-primary text-gray-900 px-8 py-3.5 rounded-full font-bold hover:bg-primary-dark transition-colors w-full shadow-sm">
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-16 font-sans">
      
      {/* Restaurant Header */}
      <div className="relative h-[300px] md:h-[400px] bg-gray-900">
        <div 
          className="absolute inset-0 opacity-50 bg-cover bg-center"
          style={{ backgroundImage: `url('${restaurant.image}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 max-w-7xl mx-auto">
          <Link to="/restaurants" className="text-white/80 hover:text-white flex items-center gap-2 mb-4 font-semibold text-sm transition-colors">
            <span>&larr;</span> Back to restaurants
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm md:text-base font-medium">
                <span className="bg-white/20 px-2 py-1 rounded backdrop-blur-sm">{restaurant.cuisine}</span>
                <span className="flex items-center gap-1">📍 {restaurant.address}</span>
                {restaurant.phone && <span className="flex items-center gap-1">📞 {restaurant.phone}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {notification && (
          <div className="fixed top-24 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 animate-bounce">
            <span>✅</span> {notification}
          </div>
        )}

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Menu Items ({menuItems.length})</h2>
        </div>
        
        {menuItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-5xl mb-3">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900">No menu items yet</h3>
            <p className="text-gray-500 mt-1">This restaurant hasn't added any dishes yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {menuItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex overflow-hidden h-[160px]">
                
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-gray-900">NPR {item.price}</span>
                    {(!user || user.role === 'customer') && (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gray-100 text-gray-900 hover:bg-primary hover:text-gray-900 p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 shadow-sm border border-gray-200"
                        title="Add to Cart"
                      >
                        <span className="text-xl leading-none font-bold">+</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {item.image && (
                  <div className="w-[140px] md:w-[160px] h-full flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
