import api from './api';

const caracteristicasService = {
    getAll: async () => {
        const res = await api.get('/caracteristicas');
        return res.data;
    },  
    create: (data) => api.post('/caracteristicas', data),
    update: (id, data) => api.put(`/caracteristicas/${id}`, data),
    delete: (id) => api.delete(`/caracteristicas/${id}`),
};

export default caracteristicasService;
