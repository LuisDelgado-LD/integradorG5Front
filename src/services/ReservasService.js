import api from "./Api";

const reservasService = {
  create: (data) => api.post("/reservas", data),

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

  cancel: (reservaId) => api.delete(`/reservas/${reservaId}`),

  getById: (id) => api.get(`/reservas/${id}`),
  getByUsuario: (usuarioId) => api.get(`/reservas/usuario/${usuarioId}`),
};

export default reservasService;
