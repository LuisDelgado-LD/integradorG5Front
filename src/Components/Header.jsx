import { Link } from "react-router-dom";
import useScrollVisibility from "../Hooks/useScrollVisibility";

const Header = () => {
  const isVisible = useScrollVisibility();

  return (
    <header className={`header ${isVisible ? "visible" : "hidden"}`}>
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
        <Link to="/registro" className="btn">Registrar Mascota</Link>
        <Link to="/login" className="btn">Iniciar sesión</Link>
      </div>
    </header>
  );
};

export default Header;