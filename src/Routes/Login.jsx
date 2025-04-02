import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";
import usuariosService from "../services/usuariosService";
import { setAuthToken } from "../services/api";

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrores({});
    setLoading(true);

    try {
      const res = await usuariosService.login({ email, password });
      const { accessToken } = res.data;
      setAuthToken(accessToken);

      const userRes = await usuariosService.getCurrentUser();
      const usuario = userRes.data;

      dispatch({ type: "LOGIN", payload: { usuario, token: accessToken } });

      navigate(usuario.rol === "ADMIN" ? "/administrador" : "/");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Credenciales incorrectas o error de servidor";
      setErrores({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img className="login-footer-image" src="/img/imagendepie.png" alt="pie" />
      <form className="login-box" onSubmit={handleLogin}>
        <img src="/img/imagendeinicio.png" alt="inicio" className="login-image" />
        <h2 className="login-title">Iniciar sesión</h2>

        <input
          className={`login-input ${errores.email ? "error" : ""}`}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errores.email && <div className="error-message">{errores.email}</div>}

        <input
          className={`login-input ${errores.password ? "error" : ""}`}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errores.password && <div className="error-message">{errores.password}</div>}

        {errores.general && <div className="error-message">{errores.general}</div>}

        <div className="login-buttons">
          <button
            type="submit"
            className="login-btn primary"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
