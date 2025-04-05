import api from "./Api";

const usuariosService = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getCurrentUser: () => api.get("/auth"),
  getAll: () => api.get("/user"),
  updateUser: (id, data) => api.put(`/user/${id}`, data),
  deleteUser: (id) => api.delete(`/auth/deleteUser`, {data: {id}}),
};

export default usuariosService;
