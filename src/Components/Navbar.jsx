import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/img/logo.png" alt="Pet Paradise Logo" className="logo" />
        </Link>
        <div className="navbar-text">
          <h1>Pet Paradise</h1>
          <p>Mucho más que una guardería, un paraíso.</p>
        </div>
      </div>
      <div className="navbar-right">
        <Link to="/registro" className="btn">Registrar Mascota</Link>
        <Link to="/login" className="btn">Iniciar sesión</Link>
      </div>
    </nav>
  );
};

export default Navbar;