import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";
import usuariosService from "../services/UsuariosService";
import { setAuthToken } from "../services/Api";

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
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    if (!formData.email.includes("@")) newErrors.email = "Correo inválido";
    if (!formData.telefono.trim()) newErrors.telefono = "Teléfono requerido";
    if (!formData.direccion.trim()) newErrors.direccion = "Dirección requerida";
    if (formData.password.length < 8 || /^\d+$/.test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres y no ser solo números";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await usuariosService.register({
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        direccion: formData.direccion,
        password: formData.password,
      });

      const res = await usuariosService.login({
        email: formData.email,
        password: formData.password,
      });

      const { accessToken } = res.data;
      setAuthToken(accessToken);
      localStorage.setItem("token", accessToken); 

      const userRes = await usuariosService.getCurrentUser();
      const usuario = userRes.data;

      dispatch({ type: "LOGIN", payload: { usuario, token: accessToken } });
      navigate(usuario.rol === "ADMIN" ? "/administrador" : "/");
    } catch (error) {
      setErrors({ general: "Error al registrar, revisá los campos e intentá de nuevo." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-page">
      <form className="form-container formulario-registro" onSubmit={handleSubmit}>
        <h2 className="registro-titulo">Registrar usuario</h2>
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className={errors.nombre ? "input-error" : ""}
        />
        {errors.nombre && <span className="error-msg">{errors.nombre}</span>}

        <input
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
          className={errors.apellido ? "input-error" : ""}
        />
        {errors.apellido && <span className="error-msg">{errors.apellido}</span>}

        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}

        <input
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
          className={errors.telefono ? "input-error" : ""}
        />
        {errors.telefono && <span className="error-msg">{errors.telefono}</span>}

        <input
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
          className={errors.direccion ? "input-error" : ""}
        />
        {errors.direccion && <span className="error-msg">{errors.direccion}</span>}

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={errors.password ? "input-error" : ""}
        />
        {errors.password && <span className="error-msg">{errors.password}</span>}

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className={errors.confirmPassword ? "input-error" : ""}
        />
        {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}

        {errors.general && <p className="error-msg">{errors.general}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
      <div className="fondo-registro">
        <img src="/img/imagendepie.png" alt="Decoración inferior" />
      </div>
    </div>
  );
};

export default Registro;
