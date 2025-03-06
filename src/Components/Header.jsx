import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Header = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const handleLogout = () => {
    setMostrarConfirmacion(false);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const getInitials = (nombre, apellido) => {
    return `${nombre?.charAt(0) || ""}${apellido?.charAt(0) || ""}`.toUpperCase();
  };

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
          <div className="user-menu">
            <div className="user-info" onClick={() => setMenuAbierto(!menuAbierto)}>
              <span>Bienvenido, {usuario.nombre}</span>
              <div className="avatar">{getInitials(usuario.nombre, usuario.apellido)}</div>
            </div>
            {menuAbierto && usuario.role === "Administrador" && (
              <div className="dropdown-menu">
                <Link to="/administrador" className="admin-link">Gestión de Maestro</Link>
                <Link to="/administrador/gestion-de-usuario" className="admin-link">Gestión de Usuarios</Link>
              </div>
            )}
              <div>
                <button onClick={() => setMostrarConfirmacion(true)} className="logout-btn">Cerrar sesión</button>
              </div>
          </div>
        ) : (
          <>
            <Link to="/registro" className="btn">Crear Cuenta</Link>
            <Link to="/login" className="btn">Iniciar sesión</Link>
          </>
        )}
      </div>

      {mostrarConfirmacion && (
        <div className="modal-overlay">
          <div className="modal">
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

