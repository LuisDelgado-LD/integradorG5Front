import api from './api';

const habitacionesService = {
  getByPage: async (page = 0) => {
    const res = await api.get(`/habitaciones?page=${page}`);
    return res.data;
  },
  getById: (id) => api.get(`/habitaciones/${id}`),
  create: (data) => api.post('/habitaciones', data),
  update: (id, data) => api.put(`/habitaciones/${id}`, data),
  delete: (id) => api.delete(`/habitaciones/${id}`),
};

export default habitacionesService;
