import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from 'axios';

const GestionCaracteristicas = () => {
  // const { state, dispatch } = useContext(GlobalContext);
  const { state } = useContext(GlobalContext);
  const { API_URL } = state;
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", icono: "" });
  const formDataBackend = new FormData();
  const [editando, setEditando] = useState(null);
  useEffect(() => {
    axios.get(`${API_URL}/caracteristicas`)
    .then((response) => {
      console.log("caracteristicas:", response.data);
      setCaracteristicas(response.data);
    })
    .catch((error) => {
      console.log(error);
    })

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.icono) return alert("❌ Campos requeridos");
  
    if (editando !== null) {
      // formDataBackend.append(formData.icono);
      console.log("Post edit caracteristica",formData);
      formDataBackend.append(formData);
      axios.post(`${API_URL}/caracteristicas/${editando}`, {
        formDataBackend, 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }
      ).then((response) => {
        console.log("caracteristicas:", response.data.content);
      })
      .catch((error) => {
        console.log(error);
      })
      setEditando(null);
    } else {
      console.log("Post nueva caracteristica",formData);
      formDataBackend.append(formData);
      axios.post(`${API_URL}/caracteristicas/`, {
        formDataBackend, 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }
      ).then((response) => {
        console.log("caracteristicas:", response.data.content);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
    setFormData({ nombre: "", icono: "" }); // reset
  };

  const handleEdit = (index) => {
    setEditando(index);
    setFormData(caracteristicas[index]);
  };

  const handleDelete = (index) => {
    // dispatch({ type: "ELIMINAR_CARACTERISTICA", payload: index });
    axios.post(`${API_URL}/caracteristicas/${index}`)
    .then((response) => {
      console.log("caracteristicas:", response.data.content);
    })
    .catch((error) => {
      console.log(error);
    })
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
          type="file"
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
        {caracteristicas.map((car, i) => (
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