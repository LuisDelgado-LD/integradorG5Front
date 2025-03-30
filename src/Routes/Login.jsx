import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Login = ({ setUsuario }) => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const mensajeReserva = location.state?.mensaje || ""; 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioRegistrado = usuariosGuardados.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    let newErrors = {};
    if (!usuarioRegistrado) {
      newErrors.email = "Correo o contraseña inválidos";
      newErrors.password = "Correo o contraseña inválidos";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormData({ email: "", password: "" });
      return;
    }
    const token = "mocked_token";
    localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
    localStorage.setItem("token", token);
    setUsuario(usuarioRegistrado);
    dispatch({ type: "LOGIN", payload: { usuario: usuarioRegistrado, token } });

    alert("Inicio de sesión exitoso");

    if (location.state?.redirectTo) {
      navigate(location.state.redirectTo);
    } else {
      navigate(usuarioRegistrado.rol === "Administrador" ? "/administrador" : "/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/img/imagendeinicio.png" alt="Inicio" className="login-image" />
        <h2 className="login-title">¡Bienvenido nuevamente!</h2>

        {mensajeReserva && <p className="info-message">{mensajeReserva}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={`login-input ${errors.email ? "error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`login-input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}

          <div className="login-buttons">
            <button type="submit" className="login-btn primary">Iniciar Sesión</button>
            <button type="button" className="login-btn secondary" onClick={() => setFormData({ email: "", password: "" })}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <img src="/img/imagendepie.png" alt="Pie" className="login-footer-image" />
    </div>
  );
};

export default Login;