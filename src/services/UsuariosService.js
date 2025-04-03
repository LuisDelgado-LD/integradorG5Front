import api from "./Api";

const usuariosService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth"),
  getAll: () => api.get("/usuarios"),
  updateUser: (id, data) => api.put(`/usuarios/${id}`, data),
  deleteUser: (id) => api.delete(`/usuarios/${id}`),
};

export default usuariosService;
