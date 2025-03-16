import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";
import axios from 'axios';

const Login = ({ setUsuario }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { API_URL } = state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // nombre: "",
    email: "",
    password: "",
  });
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
    const usuarioRegistrado = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")) : null;
    let newErrors = {};
    // if (!formData.nombre.trim()) {
    //   newErrors.nombre = "El nombre es obligatorio";
    // }
    if (
      !usuarioRegistrado ||
      usuarioRegistrado.email !== formData.email ||
      usuarioRegistrado.password !== formData.password
    ) {
      newErrors.email = "Correo o contraseña inválidos";
      newErrors.password = "Correo o contraseña inválidos";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormData({ nombre: "", email: "", password: "" });
      return;
    }
    const token = "mocked_token";
    localStorage.setItem("usuario", JSON.stringify(usuarioRegistrado));
    localStorage.setItem("token", token);
    setUsuario(usuarioRegistrado); 
    dispatch({
      type: "LOGIN",
      payload: { usuario: usuarioRegistrado, token },
    });
    alert(" Inicio de sesión exitoso");
    if (usuarioRegistrado.rol === "admin") {
      navigate("/administrador");
    } else {
      navigate("/");
    }
  };

  const loginBackend = (e) => {
    e.preventDefault();
    console.log(formData)
    axios.post(API_URL+"/auth/login", formData)
    .then(response => {
      console.log('Login exitoso', response.data);
      alert("✅ Login exitoso");
      dispatch({ type: "LOGIN", payload: { usuario: formData, token: response.data.accessToken } });
      navigate("/");
    })
    .catch(error => {
      console.error('Error al registrar usuario:', error);
      alert("Ocurrio un error con el registro")
    });

  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/img/imagendeinicio.png" alt="Inicio" className="login-image" />
        <h2 className="login-title">¡Bienvenido nuevamente!</h2>
        <form onSubmit={loginBackend}>
          {/* <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`login-input ${errors.nombre ? "error" : ""}`}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>} */}
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
            <button type="button" className="login-btn secondary">
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