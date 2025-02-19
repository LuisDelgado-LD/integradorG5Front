import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  if (location.pathname !== "/") return null;

  return (
    <nav className="navbar">
      <p className="navbar-text">Escoge la Fecha para tu peludito</p>

      <div className="date-picker-container">
        <div className="date-picker">
          <label className="date-label">Fecha de ingreso</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
            <input type="date" className="date-input" />
          </div>
        </div>

        <div className="date-picker">
          <label className="date-label">Fecha salida</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Calendario salida" className="calendar-icon" />
            <input type="date" className="date-input" />
          </div>
        </div>
      </div>

      <button className="search-button">Buscar</button>
    </nav>
  );
};

export default Navbar;
