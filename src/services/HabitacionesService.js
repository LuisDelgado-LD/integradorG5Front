import api from "./Api";

const formatFecha = (fechaISO) => fechaISO.split("T")[0];

const habitacionesService = {
  getByPage: async (page = 0) => {
    const res = await api.get(`/habitaciones?page=${page}`);
    return res.data;
  },

  getById: (id) => api.get(`/habitaciones/${id}`),

  create: (data, isFormData = false) =>
    isFormData
      ? api.post("/habitaciones", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : api.post("/habitaciones", data),

  update: (id, data, isFormData = false) =>
    isFormData
      ? api.put(`/habitaciones/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : api.put(`/habitaciones/${id}`, data),

  delete: (id) => api.delete(`/habitaciones/${id}`),

  getCategorias: () => api.get("/categorias"),

  deleteCategoria: (id) => api.delete(`/categorias/${id}`),

  buscarPorNombre: (nombre) =>
    api.get(`/habitaciones/nombre`, { params: { nombre } }),

  buscarPorFechas: (entrada, salida) =>
    api.get(`/habitaciones/disponibles`, {
      params: {
        fechaEntrada: formatFecha(entrada),
        fechaSalida: formatFecha(salida),
      },
    }),

  buscarPorNombreYFechas: (nombre, entrada, salida) =>
    api.post(`/habitaciones/buscar`, {
      nombre,
      entrada: formatFecha(entrada),
      salida: formatFecha(salida),
    }),
};

export default habitacionesService;
