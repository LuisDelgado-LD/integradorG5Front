import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";
import DynamicForm from "../Components/DynamicForm";

/* const API_URL = "http://petparadise.sytes.net/api"; */

const Login = () => {
  const [keyForm, setKeyForm] = useState(0);
  const [error, setError] = useState("");
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleLogin = async (formData, resetForm) => {
    setError("");

    if (!formData.email || !formData.password) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //conexión con backend
      /*
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("❌ Credenciales incorrectas.");
      }

      const data = await response.json();
      */

      const data = {
        token: "mocked_token",
        usuario: {
          nombre: formData.email.split("@")[0],
          apellido: "Usuario",
          email: formData.email,
          rol: "Administrador"
        },
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      dispatch({ type: "LOGIN", payload: { usuario: data.usuario, token: data.token } });

      alert(`✅ Inicio de sesión exitoso. Bienvenido/a, ${data.usuario.nombre} ${data.usuario.apellido}`);
      resetForm();
      setKeyForm((prev) => prev + 1);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      {error && <p className="error-message">{error}</p>}
      <DynamicForm
        key={keyForm}
        title="Inicio de Sesión"
        fields={[
          { name: "email", label: "Correo Electrónico", type: "email", required: true },
          { name: "password", label: "Contraseña", type: "password", required: true },
        ]}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
