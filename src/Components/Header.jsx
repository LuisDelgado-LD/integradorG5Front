import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  const handleLogout = () => {
    setMostrarConfirmacion(false);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const getInitials = (nombre, apellido) => {
    return `${nombre?.charAt(0) || ""}${apellido?.charAt(0) || ""}`.toUpperCase();
  };

  const isAdmin = usuario?.rol === "Administrador" && location.pathname.startsWith("/administrador");

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src="/img/logo.png" alt="Pet Paradise Logo" className="logo" />
        </Link>
        <div className="header-text">
          <h1>Pet Paradise</h1>
          <p>Mucho más que una guardería, un paraíso.</p>
        </div>
      </div>

      <div className="header-right">
        {usuario ? (
          isAdmin ? (
            <>
              <span className="admin-bienvenida">Bienvenido, Administrador</span>
              <div className="avatar">{getInitials(usuario.nombre, usuario.apellido)}</div>
              <img
                src="/img/Group8.png"
                alt="Abrir menú"
                className="menu-icon"
                onClick={() => setMostrarSidebar(!mostrarSidebar)}
              />
            </>
          ) : (
            <div className="user-menu">
              <div className="user-info" onClick={() => setMenuAbierto(!menuAbierto)}>
                <span>Bienvenido, {usuario.nombre}</span>
                <div className="avatar">{getInitials(usuario.nombre, usuario.apellido)}</div>
              </div>
              {menuAbierto && (
                <div className="dropdown-menu">
                  <Link to="/administrador/gestion-maestro" className="admin-link">Gestión de Maestro</Link>
                  <Link to="/administrador/gestion-de-usuario" className="admin-link">Gestión de Usuarios</Link>
                </div>
              )}
              <div>
                <button onClick={() => setMostrarConfirmacion(true)} className="logout-btn">Cerrar sesión</button>
              </div>
            </div>
          )
        ) : (
          <>
            <Link to="/registro" className="btn">Crear Cuenta</Link>
            <Link to="/login" className="btn">Iniciar sesión</Link>
          </>
        )}
      </div>

      {mostrarSidebar && isAdmin && (
        <aside className="admin-sidebar">
          <div className="avatar-large">{getInitials(usuario.nombre, usuario.apellido)}</div>
          <p className="admin-name">{usuario.nombre} {usuario.apellido}</p>

          <div className="admin-link" onClick={() => navigate("/administrador/gestion-de-usuario")}>
            <img src="/img/configuración.png" alt="Permisos" /> Permisos de Usuario
          </div>
          <div className="admin-link" style={{ marginTop: '5mm' }} onClick={() => navigate("/administrador/gestion-maestro")}>
            <img src="/img/mas.png" alt="Maestro" /> Administrar Maestro
          </div>
          <div className="admin-link" style={{ marginTop: '5mm' }} onClick={() => navigate("/administrador/gestion-caracteristicas")}>
            <img src="/img/mas.png" alt="Características" /> Administrar Características
          </div>
          <div className="admin-link" style={{ marginTop: '5mm' }} onClick={() => setMostrarConfirmacion(true)}>
            <img src="/img/cerrarsecion.png" alt="Cerrar sesión" /> Cerrar sesión
          </div>
        </aside>
      )}

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
            <img src="/img/campana.png" alt="Campana" />
            <p>¿Está seguro de que desea cerrar sesión?</p>
            <div className="modal-buttons">
              <button onClick={handleLogout} className="btn-confirm">Sí, cerrar sesión</button>
              <button onClick={() => setMostrarConfirmacion(false)} className="btn-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;