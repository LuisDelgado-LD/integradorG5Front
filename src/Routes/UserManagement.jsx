import { useEffect, useState } from "react";
import usuariosService from "../services/UsuariosService";

const UserManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    try {
      const res = await usuariosService.getAll();
      setUsuarios(res.data);
    } catch (error) {
      alert("Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      try {
        await usuariosService.deleteUser(id);
        setUsuarios(usuarios.filter(u => u.id !== id));
      } catch {
        alert("No se pudo eliminar");
      }
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      {loading ? <p>Cargando...</p> : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th><th>Email</th><th>Rol</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre} {u.apellido}</td>
                <td>{u.email}</td>
                <td>{u.rol || "General"}</td>
                <td>
                  <button onClick={() => eliminarUsuario(u.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
