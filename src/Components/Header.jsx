import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import SoloEscritorio from "./SoloEscritorio";

const Header = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;
  const navigate = useNavigate();

  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarSinReserva, setMostrarSinReserva] = useState(false); 

  const getInitials = (nombre, apellido) =>
    `${nombre?.charAt(0) || ""}${apellido?.charAt(0) || ""}`.toUpperCase();

  const handleLogout = () => {
    setMostrarConfirmacion(false);
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const SidebarGeneral = () => (
    <aside className="admin-sidebar">
      <div className="avatar-large">{getInitials(usuario?.nombre, usuario?.apellido)}</div>
      <p className="admin-name">{usuario?.nombre} {usuario?.apellido}</p>

      <div
        className="admin-link"
        onClick={() => {
          if (state.reserva && state.reserva.reservaId) {
            navigate("/reserva/confirmacion");
          } else {
            setMostrarSinReserva(true);
          }
        }}
      >
        <img src="/img/configuración.png" alt="Reservas" /> Lista de Reservas
      </div>
      <div className="admin-link" onClick={() => setMostrarConfirmacion(true)}>
        <img src="/img/cerrarsecion.png" alt="Cerrar sesión" /> Cerrar sesión
      </div>
    </aside>
  );

  const SidebarAdmin = () => (
    <SoloEscritorio>
      <aside className="admin-sidebar">
        <div className="avatar-large">{getInitials(usuario?.nombre, usuario?.apellido)}</div>
        <p className="admin-name">{usuario?.nombre} {usuario?.apellido}</p>

        <div className="admin-link" onClick={() => navigate("/administrador/gestion-usuarios")}>
          <img src="/img/configuración.png" alt="Usuarios" /> Permisos de Usuarios
        </div>
        <div className="admin-link" onClick={() => navigate("/administrador/gestion-habitaciones")}>
          <img src="/img/mas.png" alt="Habitaciones" /> Administrar Habitaciones
        </div>
        <div className="admin-link" onClick={() => navigate("/administrador/gestion-caracteristicas")}>
          <img src="/img/mas.png" alt="Características" /> Administrar Características
        </div>
        <div className="admin-link" onClick={() => setMostrarConfirmacion(true)}>
          <img src="/img/cerrarsecion.png" alt="Cerrar sesión" /> Cerrar sesión
        </div>
      </aside>
    </SoloEscritorio>
  );

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate("/")}>
        <img src="/img/logo.png" alt="Pet Paradise Logo" className="logo" />
        <div className="header-text">
          <h1>Pet Paradise</h1>
          <p>Mucho más que una guardería, un paraíso</p>
        </div>
      </div>

      <div className="header-right">
        {usuario ? (
          <>
            <span className="admin-bienvenida">
              Bienvenido{usuario.rol === "ADMIN" ? ", Administrador" : `, ${usuario.nombre}`}
            </span>
            <div
              className="avatar-circle"
              onClick={() => setMostrarSidebar((prev) => !prev)}
            >
              {getInitials(usuario.nombre, usuario.apellido)}
            </div>
          </>
        ) : (
          <>
            <Link to="/registro" className="btn">Crear Cuenta</Link>
            <Link to="/login" className="btn">Iniciar sesión</Link>
          </>
        )}
      </div>

      {mostrarSidebar && (
        <>
          <div className="sidebar-overlay" onClick={() => setMostrarSidebar(false)}></div>
          {usuario?.rol === "ADMIN" ? <SidebarAdmin /> : <SidebarGeneral />}
        </>
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

      {mostrarSinReserva && (
        <div className="modal-overlay">
          <div className="modal">
            <img src="/img/campana.png" alt="Campana" />
            <p>No tiene reserva activa</p>
            <div className="modal-buttons">
              <button onClick={() => setMostrarSinReserva(false)} className="btn-confirm">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
