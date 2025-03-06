import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DynamicForm from "../Components/DynamicForm";

/*const API_URL = "http://petparadise.sytes.net/api";*/

const Registro = () => {
  const [keyForm, setKeyForm] = useState(0);
  const [error, setError] = useState("");
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleRegistro = async (formData, resetForm) => {
    setError("");

    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.password
    ) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      //conexión con backend 
      /*
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("❌ Error en el registro.");
      }

      const data = await response.json();
      */

      const data = {
        usuario: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
        },
        token: "mocked_token",
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      dispatch({ type: "LOGIN", payload: { usuario: data.usuario, token: data.token } });

      alert(`✅ Registro exitoso: Bienvenida, ${data.usuario.nombre} ${data.usuario.apellido}`);

      resetForm();
      setKeyForm((prev) => prev + 1);

      setTimeout(() => {
        alert("✅ Confirmación completada. Redirigiendo a Home...");
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="registro">
      <h2>Registro de Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <DynamicForm
        key={keyForm}
        title="Registro"
        fields={[
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { name: "apellido", label: "Apellido", type: "text", required: true },
          { name: "email", label: "Correo Electrónico", type: "email", required: true },
          { name: "telefono", label: "Teléfono", type: "text", required: true },
          { name: "direccion", label: "Dirección", type: "text", required: true },
          { name: "password", label: "Contraseña", type: "password", required: true },
          { name: "confirmPassword", label: "Confirmar Contraseña", type: "password", required: true },
        ]}
        onSubmit={handleRegistro}
      />
    </div>
  );
};

export default Registro;
