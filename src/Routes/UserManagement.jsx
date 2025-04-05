import { useEffect, useState } from "react";
import usuariosService from "../services/UsuariosService";
import SoloEscritorio from "../Components/SoloEscritorio";

const UserManagement = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ visible: false, user: null });
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    rol: "GENERAL",
  });

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

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const abrirEditar = (usuario) => {
    setModoEdicion(true);
    setUsuarioSeleccionado(usuario);
    setFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol || "GENERAL",
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion && usuarioSeleccionado) {
        console.log(formData)
        await usuariosService.updateUser(usuarioSeleccionado.id, formData);
        fetchUsuarios();
      }
      setModalOpen(false);
    } catch {
      alert("Error al guardar");
    }
  };

  const solicitarEliminacion = (user) => {
    setConfirmModal({ visible: true, user });
  };

  const confirmarEliminacion = async () => {
    try {
      await usuariosService.deleteUser(confirmModal.user.id);
      setUsuarios(usuarios.filter(u => u.id !== confirmModal.user.id));
      setConfirmModal({ visible: false, user: null });
    } catch {
      alert("No se pudo eliminar el usuario");
    }
  };

  const cancelarEliminacion = () => {
    setConfirmModal({ visible: false, user: null });
  };

  return (
    <SoloEscritorio>
      <div className="gestion-maestro-page">
        <div className="container-gestion">
          <h2 className="titulo-gestion">Gestión de Usuarios</h2>

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <table className="tabla-maestros">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>{u.nombre} {u.apellido}</td>
                    <td>{u.email}</td>
                    <td>{u.rol || "General"}</td>
                    <td>
                      <span className="icono" onClick={() => abrirEditar(u)}>🖊️</span>
                      <span className="icono" onClick={() => solicitarEliminacion(u)}>🗑️</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}</h3>
                <form onSubmit={handleGuardar}>
                  <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
                  <input name="apellido" value={formData.apellido} onChange={handleChange} placeholder="Apellido" required />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" required />
                  <select name="rol" value={formData.rol} onChange={handleChange}>
                    <option value="ADMIN">Administrador</option>
                    <option value="GENERAL">General</option>
                  </select>
                  <button className="btn-guardar" type="submit">Guardar</button>
                  <button className="btn-cancelar" type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>
              </div>
            </div>
          )}

          {confirmModal.visible && (
            <div className="modal-overlay">
              <div className="modal center-modal">
                <img src="/img/campana.png" alt="icono" />
                <p>¿Seguro que deseas eliminar <strong>{confirmModal.user?.nombre}</strong>?</p>
                <div className="modal-buttons">
                  <button className="btn-confirm" onClick={confirmarEliminacion}>Eliminar</button>
                  <button className="btn-cancel" onClick={cancelarEliminacion}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <img src="/img/imagendepie.png" alt="pie" className="imagen-pie" />
      </div>
    </SoloEscritorio>
  );
};

export default UserManagement;
