import { useLocation } from "react-router-dom";
import useScrollVisibility from "../Hooks/useScrollVisibility";

const Navbar = () => {
  const location = useLocation();
  const isVisible = useScrollVisibility();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <nav className={`navbar ${isVisible ? "visible" : "hidden"}`}>
      <p className="navbar-text">Escoge la Fecha para tu peludito</p>
      <div className="date-picker-container">
        <div className="date-picker">
          <label className="date-label">Fecha de ingreso</label>
          <div className="calendar-box">
            <img src="/img/Group_4.png" alt="Calendario de ingreso" className="calendar-bg" />
            <img src="/img/calendario.png" alt="Ícono calendario" className="calendar-icon" />
          </div>
        </div>
        <div className="date-picker">
          <label className="date-label">Fecha salida</label>
          <div className="calendar-box">
            <img src="/img/Group_4.png" alt="Calendario de salida" className="calendar-bg" />
            <img src="/img/calendario.png" alt="Ícono calendario" className="calendar-icon" />
          </div>
        </div>
      </div>
      <img src="/img/buscar.png" alt="Botón Buscar" className="search-button" />
    </nav>
  );
};

export default Navbar;