import { useState } from "react";

export default function Modal({ isOpen, onClose, onSave, initialData }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(initialData || { name: "", email: "" });

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
        <h2>{initialData ? "Editar" : "Crear"} Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// CSS puro
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}
.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.modal-buttons button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 5px;
}
.modal-buttons button:hover {
  background: #0056b3;
}
`;

const styleTag = document.createElement("style");
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);