import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        {location.pathname === "/administrador" ? (
          <div className="admin-header">
            <span>Bienvenido, Administrador</span>
            <button onClick={() => navigate("/agregar-producto")} className="admin-btn">
              Añadir Producto
            </button>
            <img src="/img/grupo8.png" alt="Admin" className="admin-img" />
          </div>
        ) : (
          <>
            <Link to="/registro" className="btn">Crear Cuenta</Link>
            <Link to="/login" className="btn">Iniciar sesión</Link>
            <Link to="/administrador" className="admin-link">Panel de Administrador</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
