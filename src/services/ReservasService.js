import api from './api';

const reservasService = {
  create: (data) => api.post('/reservas', data),

  getByHabitacion: (habitacionId) =>
    api.get(`/reservas?habitacionId=${habitacionId}`),

  checkDisponibilidad: (habitacionId, inicio, fin) =>
    api.get(`/reservas/disponibilidad`, {
      params: {
        habitacionId,
        fechaInicio: inicio,
        fechaFin: fin,
      },
    }),

  cancel: (reservaId) => api.delete(`/reservas/${reservaId}`), // 👈 NUEVO
};

export default reservasService;
