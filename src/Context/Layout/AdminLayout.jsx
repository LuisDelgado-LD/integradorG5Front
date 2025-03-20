import { Outlet, Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useContext, useState } from "react";
import { GlobalContext } from "../utils/globalContext";

const AdminLayout = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;
  const navigate = useNavigate();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const getInitials = (nombre, apellido) => {
    return `${nombre?.charAt(0)}${apellido?.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    setMostrarConfirmacion(false);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <Header />

      <div className="admin-body">
        <aside className="admin-sidebar">
          <div className="sidebar-avatar">
            <div className="avatar-circle">{getInitials(usuario.nombre, usuario.apellido)}</div>
            <p className="sidebar-name">{usuario.nombre} {usuario.apellido}</p>
          </div>

          <nav className="sidebar-nav">
            <Link to="/administrador/gestion-de-usuario">
              <img src="/img/Group8.png" alt="Permisos" /> Permisos de Usuario
            </Link>
            <Link to="/administrador/gestion-maestro">
              <img src="/img/mas.png" alt="Maestro" /> Administrar Maestro
            </Link>
            <Link to="/administrador/gestion-caracteristicas">
              <img src="/img/mas.png" alt="Características" /> Administrar Características
            </Link>
            <div className="logout-link" onClick={() => setMostrarConfirmacion(true)}>
              <img src="/img/cerrarsecion.png" alt="Cerrar sesión" /> Cerrar sesión
            </div>
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
            <img src="/img/campana.png" alt="Alerta" />
            <p>¿Está seguro de que desea cerrar sesión?</p>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="btn-confirm">Sí, cerrar sesión</button>
              <button onClick={() => setMostrarConfirmacion(false)} className="btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminLayout;