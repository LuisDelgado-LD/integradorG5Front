import { Link } from "react-router-dom";
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <header>
      <div>

        <div>
          <Link to="/">
            <img src={logo} alt="Logo"/>
          </Link>
          <span> Mucho mas que una guarderia,un paraíso</span>
        </div>

        <div>
          <button>
            Crear cuenta
          </button>
          <button>
            Iniciar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;