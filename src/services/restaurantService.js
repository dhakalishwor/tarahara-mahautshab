import api from './api';

export const restaurantService = {
  getAll: async (userId = null) => {
    const params = userId ? { user_id: userId } : {};
    const response = await api.get('/restaurants', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/restaurants', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/restaurants/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/restaurants/${id}`);
    return response.data;
  },
};

export const menuItemService = {
  getAll: async (restaurantId = null) => {
    const params = restaurantId ? { restaurant_id: restaurantId } : {};
    const response = await api.get('/menu-items', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/menu-items/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/menu-items', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/menu-items/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/menu-items/${id}`);
    return response.data;
  },
};
