import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const GestionCaracteristicas = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [formData, setFormData] = useState({ nombre: "", icono: "" });
  const [editando, setEditando] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.icono) return alert("❌ Campos requeridos");
  
    if (editando !== null) {
      dispatch({ 
        type: "EDITAR_CARACTERISTICA", 
        payload: { index: editando, data: formData } // <- Aquí estás enviando el objeto con nombre e ícono
      });
      setEditando(null);
    } else {
      dispatch({ 
        type: "AGREGAR_CARACTERISTICA", 
        payload: formData
      });
    }
  
    setFormData({ nombre: "", icono: "" });
  };

  const handleEdit = (index) => {
    setEditando(index);
    setFormData(state.caracteristicas[index]);
  };

  const handleDelete = (index) => {
    dispatch({ type: "ELIMINAR_CARACTERISTICA", payload: index });
  };

  return (
    <div className="admin-container">
      <h2>Administrar Características</h2>
      <div className="form-container">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la característica"
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="icono"
          placeholder="URL del ícono"
          value={formData.icono}
          onChange={handleChange}
        />
        {formData.icono && (
  <div style={{ margin: "10px 0" }}>
    <strong>Vista previa del ícono:</strong>
    <br />
    <img src={formData.icono} alt="Ícono" style={{ width: "40px", height: "40px" }} />
  </div>
)}
        <button onClick={handleSave}>{editando !== null ? "Actualizar" : "Guardar"}</button>
      </div>
      <ul>
        {state.caracteristicas.map((car, i) => (
          <li key={i}>
            <img src={car.icono} alt={car.nombre} style={{ width: "30px" }} />
            {car.nombre}
            <FaEdit onClick={() => handleEdit(i)} style={{ cursor: "pointer", margin: "0 10px" }} />
            <FaTrash onClick={() => handleDelete(i)} style={{ cursor: "pointer" }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionCaracteristicas;