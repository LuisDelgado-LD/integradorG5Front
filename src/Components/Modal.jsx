import { useState } from "react";

export default function Modal({ isOpen, onClose, onSave, initialData }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(
    initialData || {
      nombre: "",
      apellido: "",
      email: "",
      rol: "General",
      // estado: "Inactivo",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Gestión Permisos de Usuarios</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Apellido:
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            email electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Rol:
            <select name="rol" value={formData.rol} onChange={handleChange}>
              <option value="Administrador">Administrador</option>
              <option value="General">General</option>
            </select>
          </label>
          {/* <label>
            Estado:
            <select name="rol" value={formData.estado} onChange={handleChange}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </label> */}
          <button type="submit" className="save-button">Guardar</button>
          <button type="button" className="close-button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

const styles = `
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 400px;
  text-align: left;
}
.modal-content h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
}
label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.save-button {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
.save-button:hover {
  background: #0056b3;
}
  .close-button {
  width: 100%;
  padding: 10px;
  background:rgb(201, 56, 56);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
.close-button:hover {
  background:rgb(145, 27, 27);
}
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);
