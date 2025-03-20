import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Registro = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const validarFormulario = () => {
  const nuevosErrores = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!formData.nombre) nuevosErrores.nombre = "Nombre requerido";
    if (!formData.apellido) nuevosErrores.apellido = "Apellido requerido";
    if (!formData.email) {
      nuevosErrores.email = "Correo requerido";
    } else if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = "Correo no válido";
    } else if (usuariosGuardados.some((user) => user.email === formData.email)) {
      nuevosErrores.email = "Este correo ya está registrado";
    }
    if (!formData.telefono) nuevosErrores.telefono = "Teléfono requerido";
    if (!formData.direccion) nuevosErrores.direccion = "Dirección requerida";
    if (!formData.password) {
      nuevosErrores.password = "Contraseña requerida";
    } else if (!passwordRegex.test(formData.password)) {
      nuevosErrores.password = "Debe tener al menos 8 caracteres, 1 mayúscula y 1 símbolo";
    }
    if (!formData.confirmPassword) {
      nuevosErrores.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }
    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = validarFormulario();
    if (Object.keys(errores).length > 0) {
      setErrors(errores);
      return;
    }

    const nuevoUsuario = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
    };
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    localStorage.setItem("token", "mocked_token");
    dispatch({ type: "LOGIN", payload: { usuario: nuevoUsuario, token: "mocked_token" } });
    alert("✅ Registro exitoso");
    navigate("/");
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="registro-page">
      <div className="form-container">
        <h2 className="registro-titulo">Registrar usuario</h2>
        <form className="formulario-registro" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del usuario"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? "input-error" : ""}
        />
        {errors.nombre && <span className="error-msg">{errors.nombre}</span>}
        <input
          type="text"
          name="apellido"
          placeholder="Apellido del usuario"
          value={formData.apellido}
          onChange={handleChange}
          className={errors.apellido ? "input-error" : ""}
        />
        {errors.apellido && <span className="error-msg">{errors.apellido}</span>}
        <input
          type="email"
          name="email"
          placeholder="Correo del usuario"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono del usuario"
          value={formData.telefono}
          onChange={handleChange}
          className={errors.telefono ? "input-error" : ""}
        />
        {errors.telefono && <span className="error-msg">{errors.telefono}</span>}
        <input
          type="text"
          name="direccion"
          placeholder="Dirección del usuario"
          value={formData.direccion}
          onChange={handleChange}
          className={errors.direccion ? "input-error" : ""}
        />
        {errors.direccion && <span className="error-msg">{errors.direccion}</span>}
        <input
          type="password"
          name="password"
          placeholder="******"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <span className="error-msg">{errors.password}</span>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="******"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
        <button type="submit">Registrar</button>
        </form>
      </div>
      <img src="/img/imagendepie.png" alt="Fondo" className="fondo-registro" />
    </div>
  );
};

export default Registro;