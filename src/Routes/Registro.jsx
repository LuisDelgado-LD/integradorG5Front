import { useState } from "react";
import DynamicForm from "../Components/DynamicForm";

const Registro = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [keyForm, setKeyForm] = useState(0);
  const [error, setError] = useState("");
  
  const validarContraseña = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}":;'?/<>,.])[A-Za-z\d!@#$%^&*()_+{}":;'?/<>,.]{8,}$/;
    return regex.test(password);
  };
  const handleRegistro = async (formData, resetForm) => {
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("❌ Las contraseñas no coinciden.");
      return;
    }

    if (!validarContraseña(formData.password)) {
      setError("❌ La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5173/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        throw new Error("❌ Error en el registro. Inténtalo nuevamente.");
      }
    alert("✅ Registro exitoso");

    resetForm();
    setMostrarFormulario(false);
    setKeyForm((prev) => prev + 1);
    setError("");
    navigate("/login");
  } catch (error) {
    setError(error.message);
  }
};
  return (
    <div className="registro">
      <h2>Registro de Usuario</h2>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Cerrar formulario" : "Registrarse"}
      </button>

      {mostrarFormulario && (
        <div>

          {error && <p className="error-message">{error}</p>}

          <DynamicForm
            key={keyForm}
            title="Registro de Usuario"
            fields={[
              { name: "nombre", label: "Nombre", type: "text", required: true },
              { name: "email", label: "Correo Electrónico", type: "email", required: true },
              { name: "password", label: "Contraseña", type: "password", required: true },
              { name: "confirmPassword", label: "Confirmar Contraseña", type: "password", required: true }
            ]}
            onSubmit={handleRegistro}
          />
        </div>
      )}
    </div>
  );
};

export default Registro;