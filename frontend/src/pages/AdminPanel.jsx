import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { restaurantService, menuItemService } from '../services/restaurantService';
import { orderService } from '../services/orderService';

export default function AdminPanel() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'restaurants';
  const [restaurants, setRestaurants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const { user } = useAuth();

  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    description: '',
    image: '',
    is_active: true,
  });

  const [menuForm, setMenuForm] = useState({
    restaurant_id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    is_available: true,
  });

  useEffect(() => {
    if (activeTab === 'restaurants') {
      fetchRestaurants();
    } else if (activeTab === 'menu' && selectedRestaurant) {
      fetchMenuItems(selectedRestaurant.id);
    } else if (activeTab === 'food') {
      fetchRestaurants();
      fetchAllMenuItems();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab, selectedRestaurant]);

  const fetchAllMenuItems = async () => {
    try {
      setLoading(true);
      const data = await menuItemService.getAll();
      setAllMenuItems(data);
    } catch (error) {
      console.error('Error fetching all menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const fetchMenuItems = async (restaurantId) => {
    try {
      setLoading(true);
      const data = await menuItemService.getAll(restaurantId);
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingRestaurant) {
        await restaurantService.update(editingRestaurant.id, restaurantForm);
      } else {
        await restaurantService.create(restaurantForm);
      }
      setShowRestaurantForm(false);
      setEditingRestaurant(null);
      setRestaurantForm({ name: '', cuisine: '', address: '', phone: '', description: '', image: '', is_active: true });
      fetchRestaurants();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      alert(error.response?.data?.message || 'Failed to save restaurant');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { ...menuForm, restaurant_id: selectedRestaurant.id };
      if (editingMenuItem) {
        await menuItemService.update(editingMenuItem.id, data);
      } else {
        await menuItemService.create(data);
      }
      setShowMenuForm(false);
      setEditingMenuItem(null);
      setMenuForm({ restaurant_id: '', name: '', description: '', price: '', category: '', image: '', is_available: true });
      fetchMenuItems(selectedRestaurant.id);
    } catch (error) {
      console.error('Error saving menu item:', error);
      alert(error.response?.data?.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) return;
    try {
      await restaurantService.delete(id);
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await menuItemService.delete(id);
      if (selectedRestaurant) fetchMenuItems(selectedRestaurant.id);
      fetchAllMenuItems();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      alert('Failed to delete menu item');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setLoading(true);
      await orderService.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  const startEditRestaurant = (restaurant) => {
    setEditingRestaurant(restaurant);
    setRestaurantForm({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      phone: restaurant.phone || '',
      description: restaurant.description || '',
      image: restaurant.image || '',
      is_active: restaurant.is_active,
    });
    setShowRestaurantForm(true);
  };

  const startEditMenuItem = (item) => {
    setEditingMenuItem(item);
    setMenuForm({
      restaurant_id: item.restaurant_id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category || '',
      image: item.image || '',
      is_available: item.is_available,
    });
    setShowMenuForm(true);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Access Denied</h2>
          <p className="text-gray-500 mb-6">This dashboard is restricted to administrators.</p>
          <Link to="/" className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {activeTab === 'restaurants' && 'Restaurants'}
              {activeTab === 'food' && 'Food Items'}
              {activeTab === 'orders' && 'Orders'}
              {activeTab === 'menu' && `Menu: ${selectedRestaurant?.name || ''}`}
            </h1>
            <p className="text-gray-500 mt-1">
              {activeTab === 'restaurants' && 'Add, edit, or remove restaurants from the platform.'}
              {activeTab === 'food' && 'Manage all food items across all restaurants.'}
              {activeTab === 'orders' && 'Monitor incoming orders and update their status.'}
              {activeTab === 'menu' && 'Manage dishes for this specific restaurant.'}
            </p>
          </div>
        </div>

        {/* RESTAURANTS TAB */}
        {activeTab === 'restaurants' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">Registered Restaurants</h2>
              <button
                onClick={() => {
                  setShowRestaurantForm(true);
                  setEditingRestaurant(null);
                  setRestaurantForm({ name: '', cuisine: '', address: '', phone: '', description: '', image: '', is_active: true });
                }}
                className="bg-primary text-gray-900 px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all font-bold shadow-sm flex items-center gap-2"
              >
                <span>+</span> Add Restaurant
              </button>
            </div>

            {/* Restaurant Form */}
            {showRestaurantForm && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{editingRestaurant ? 'Edit Restaurant' : 'Create New Restaurant'}</h3>
                  <button onClick={() => setShowRestaurantForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <form onSubmit={handleRestaurantSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Name *</label>
                      <input type="text" value={restaurantForm.name} onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Cuisine *</label>
                      <input type="text" value={restaurantForm.cuisine} onChange={(e) => setRestaurantForm({ ...restaurantForm, cuisine: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" placeholder="e.g. Italian • Pizza" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Address *</label>
                      <input type="text" value={restaurantForm.address} onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Phone</label>
                      <input type="text" value={restaurantForm.phone} onChange={(e) => setRestaurantForm({ ...restaurantForm, phone: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Header Image URL</label>
                      <input type="text" value={restaurantForm.image} onChange={(e) => setRestaurantForm({ ...restaurantForm, image: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" placeholder="https://images.unsplash.com/photo-..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Description</label>
                      <textarea value={restaurantForm.description} onChange={(e) => setRestaurantForm({ ...restaurantForm, description: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" rows="3"></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <input type="checkbox" id="isActive" checked={restaurantForm.is_active} onChange={(e) => setRestaurantForm({ ...restaurantForm, is_active: e.target.checked })} className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" />
                    <label htmlFor="isActive" className="font-semibold text-gray-700 cursor-pointer flex-1">Restaurant is currently active and accepting orders</label>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => { setShowRestaurantForm(false); setEditingRestaurant(null); }} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="bg-gray-900 text-white px-8 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-bold shadow-md">
                      {loading ? 'Saving...' : editingRestaurant ? 'Save Changes' : 'Create Restaurant'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Restaurant List Grid */}
            {loading && !showRestaurantForm ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : restaurants.length === 0 ? (
               <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                 <div className="text-5xl mb-3">🏪</div>
                 <h3 className="text-xl font-bold text-gray-900">No restaurants yet</h3>
                 <p className="text-gray-500 mt-1">Click the Add Restaurant button to create your first one.</p>
               </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group">
                    <div className="h-32 bg-gray-100 relative">
                       {restaurant.image ? (
                         <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">No Image provided</div>
                       )}
                       <div className="absolute top-3 right-3">
                          <span className={`px-2.5 py-1 rounded shadow-sm text-xs font-bold ${restaurant.is_active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            {restaurant.is_active ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                       </div>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                      <p className="text-gray-500 text-sm mb-4">{restaurant.cuisine} • {restaurant.address}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                        <button onClick={() => { setSelectedRestaurant(restaurant); setActiveTab('menu'); }} className="col-span-3 bg-primary text-gray-900 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors mb-2 text-sm shadow-sm">
                          Manage Menu ({restaurant.menu_items?.length || 0})
                        </button>
                        
                        <button onClick={() => startEditRestaurant(restaurant)} className="col-span-2 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm">
                          Edit Details
                        </button>
                        <button onClick={() => handleDeleteRestaurant(restaurant.id)} className="col-span-1 bg-red-50 text-red-600 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors text-sm flex items-center justify-center">
                          <span title="Delete">🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MENU ITEMS TAB */}
        {activeTab === 'menu' && selectedRestaurant && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div>
                 <h2 className="text-xl font-bold text-gray-900">Menu for {selectedRestaurant.name}</h2>
                 <p className="text-sm text-gray-500">Manage dishes and pricing</p>
              </div>
              <button
                onClick={() => {
                  setShowMenuForm(true);
                  setEditingMenuItem(null);
                  setMenuForm({ restaurant_id: '', name: '', description: '', price: '', category: '', image: '', is_available: true });
                }}
                className="bg-primary text-gray-900 px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all font-bold shadow-sm flex items-center gap-2"
              >
                <span>+</span> Add Dish
              </button>
            </div>

            {/* Menu Form */}
            {showMenuForm && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8 relative">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{editingMenuItem ? 'Edit Dish' : 'Add New Dish'}</h3>
                  <button onClick={() => setShowMenuForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <form onSubmit={handleMenuSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Dish Name *</label>
                      <input type="text" value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Price (NPR) *</label>
                      <input type="number" step="0.01" value={menuForm.price} onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Category</label>
                      <input type="text" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" placeholder="e.g. Appetizers, Mains, Drinks" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Image URL</label>
                      <input type="text" value={menuForm.image} onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" placeholder="https://images.unsplash.com/photo-..." />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Description</label>
                      <textarea value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-900" rows="3" placeholder="Ingredients, preparation method..."></textarea>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <input type="checkbox" id="isAvailable" checked={menuForm.is_available} onChange={(e) => setMenuForm({ ...menuForm, is_available: e.target.checked })} className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" />
                    <label htmlFor="isAvailable" className="font-semibold text-gray-700 cursor-pointer flex-1">Dish is currently available in stock</label>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => { setShowMenuForm(false); setEditingMenuItem(null); }} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="bg-gray-900 text-white px-8 py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-bold shadow-md">
                      {loading ? 'Saving...' : editingMenuItem ? 'Save Changes' : 'Add Dish'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Menu List */}
            {loading && !showMenuForm ? (
               <div className="flex justify-center py-12">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : menuItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-5xl mb-3">🍽️</div>
                  <h3 className="text-xl font-bold text-gray-900">No dishes yet</h3>
                  <p className="text-gray-500 mt-1">Start building the menu for this restaurant.</p>
                </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-bold text-gray-700 text-sm">Item</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Category</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Price</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Status</th>
                      <th className="p-4 font-bold text-gray-700 text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item, index) => (
                      <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border border-gray-200" />
                            ) : (
                              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs">IMG</div>
                            )}
                            <div>
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]" title={item.description}>{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 font-medium">
                          {item.category || '-'}
                        </td>
                        <td className="p-4 font-bold text-gray-900">
                          NPR {item.price}
                        </td>
                        <td className="p-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {item.is_available ? 'In Stock' : 'Out of Stock'}
                           </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => startEditMenuItem(item)} className="p-2 text-gray-500 hover:text-primary-dark transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow">
                              ✏️
                            </button>
                            <button onClick={() => handleDeleteMenuItem(item.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors bg-white border border-gray-200 rounded shadow-sm hover:shadow">
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* FOOD ITEMS TAB */}
        {activeTab === 'food' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900">All Food Items</h2>
              <button
                onClick={() => {
                  if (restaurants.length === 0) { alert('Please create a restaurant first.'); return; }
                  setShowMenuForm(true);
                  setEditingMenuItem(null);
                  setSelectedRestaurant(restaurants[0]);
                  setMenuForm({ restaurant_id: '', name: '', description: '', price: '', category: '', image: '', is_available: true });
                }}
                className="bg-primary text-gray-900 px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all font-bold shadow-sm flex items-center gap-2"
              >
                <span>+</span> Add Food Item
              </button>
            </div>

            {showMenuForm && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">{editingMenuItem ? 'Edit Food Item' : 'Add New Food Item'}</h3>
                  <button onClick={() => setShowMenuForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <form onSubmit={handleMenuSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Restaurant *</label>
                      <select value={selectedRestaurant?.id || ''} onChange={(e) => setSelectedRestaurant(restaurants.find(r => r.id === parseInt(e.target.value)))} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" required>
                        {restaurants.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Dish Name *</label>
                      <input type="text" value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Price (NPR) *</label>
                      <input type="number" step="0.01" value={menuForm.price} onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" required />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Category</label>
                      <input type="text" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" placeholder="e.g. Appetizers, Mains" />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Image URL</label>
                      <input type="text" value={menuForm.image} onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold text-sm mb-2">Description</label>
                      <input type="text" value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900" />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <input type="checkbox" checked={menuForm.is_available} onChange={(e) => setMenuForm({ ...menuForm, is_available: e.target.checked })} className="w-5 h-5" />
                    <label className="font-semibold text-gray-700">Available in stock</label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" onClick={() => setShowMenuForm(false)} className="px-6 py-2.5 rounded-lg text-gray-600 font-bold hover:bg-gray-100">Cancel</button>
                    <button type="submit" disabled={loading} className="bg-gray-900 text-white px-8 py-2.5 rounded-lg font-bold shadow-md">
                      {loading ? 'Saving...' : editingMenuItem ? 'Save Changes' : 'Add Food'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading && !showMenuForm ? (
              <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
            ) : allMenuItems.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="text-5xl mb-3">🍽️</div>
                <h3 className="text-xl font-bold text-gray-900">No food items yet</h3>
                <p className="text-gray-500 mt-1">Add food items to your restaurants.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-bold text-gray-700 text-sm">Item</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Restaurant</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Category</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Price</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Status</th>
                      <th className="p-4 font-bold text-gray-700 text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allMenuItems.map((item, index) => (
                      <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${index !== allMenuItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover border border-gray-200" />
                            ) : (
                              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs">IMG</div>
                            )}
                            <div>
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 font-medium">{item.restaurant?.name || '-'}</td>
                        <td className="p-4 text-sm text-gray-600 font-medium">{item.category || '-'}</td>
                        <td className="p-4 font-bold text-gray-900">NPR {item.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.is_available ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setSelectedRestaurant(restaurants.find(r => r.id === item.restaurant_id)); startEditMenuItem(item); }} className="p-2 text-gray-500 hover:text-primary-dark bg-white border border-gray-200 rounded shadow-sm">✏️</button>
                            <button onClick={() => handleDeleteMenuItem(item.id)} className="p-2 text-gray-500 hover:text-red-600 bg-white border border-gray-200 rounded shadow-sm">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div>
                 <h2 className="text-xl font-bold text-gray-900">Order Management</h2>
                 <p className="text-sm text-gray-500">Monitor and update customer orders</p>
              </div>
              <button
                onClick={fetchOrders}
                className="bg-gray-100 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all font-bold shadow-sm flex items-center gap-2"
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
               <div className="flex justify-center py-12">
                 <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-5xl mb-3">📦</div>
                  <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
                  <p className="text-gray-500 mt-1">When customers place orders, they will appear here.</p>
                </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="p-4 font-bold text-gray-700 text-sm">Order ID</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Customer</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Details</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Amount</th>
                      <th className="p-4 font-bold text-gray-700 text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id} className={`hover:bg-gray-50 transition-colors ${index !== orders.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <td className="p-4">
                          <p className="font-bold text-gray-900">#{order.id}</p>
                          <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-gray-900">{order.user?.name || 'Unknown User'}</p>
                          <p className="text-xs text-gray-500">{order.phone}</p>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          <p className="font-medium line-clamp-1">{order.delivery_address}</p>
                          <p className="text-xs text-gray-500 mt-1">{order.items?.length || 0} items</p>
                        </td>
                        <td className="p-4 font-bold text-gray-900">
                          NPR {order.total_amount}
                        </td>
                        <td className="p-4">
                          <select 
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-bold border-2 outline-none cursor-pointer
                              ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 focus:border-yellow-400' : ''}
                              ${order.status === 'Preparing' ? 'bg-blue-50 text-blue-700 border-blue-200 focus:border-blue-400' : ''}
                              ${order.status === 'Out for Delivery' ? 'bg-purple-50 text-purple-700 border-purple-200 focus:border-purple-400' : ''}
                              ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200 focus:border-green-400' : ''}
                              ${order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200 focus:border-red-400' : ''}
                            `}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
