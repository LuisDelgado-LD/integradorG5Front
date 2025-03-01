import { useState } from "react";
import DynamicForm from "../Components/DynamicForm";

const Login = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [keyForm, setKeyForm] = useState(0);

  const handleLogin = (formData, resetForm) => {
    console.log("Usuario autenticado:", formData);
    alert("✅ Inicio de sesión exitoso");
    resetForm();
    setMostrarFormulario(false);
    setKeyForm((prev) => prev + 1);
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Cerrar formulario" : "Iniciar Sesión"}
      </button>

      {mostrarFormulario && (
        <DynamicForm
          key={keyForm}
          title="Inicio de Sesión"
          fields={[
            { name: "email", label: "Correo Electrónico", type: "email", required: true },
            { name: "password", label: "Contraseña", type: "password", required: true }
          ]}
          onSubmit={handleLogin}
        />
      )}
    </div>
  );
};

export default Login;