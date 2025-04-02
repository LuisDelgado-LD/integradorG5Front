import { useContext, useEffect, useState, useRef } from "react";
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
  const fileInputRef = useRef(null);
  
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
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSave = () => {
    // const formDataBackend = new FormData();
    if (!formData.nombre || !formData.icono) return alert("❌ Campos requeridos");
  
    if (editando !== null) {
      // formDataBackend.append(formData.icono);
      console.log("data",formData)
      console.log("Put edit caracteristica",formData);
      formDataBackend.append("nombre",formData.nombre);
      formDataBackend.append("icono",formData.icono);
      const idCaracteristica=caracteristicas[editando].id
      axios.put(`${API_URL}/caracteristicas/${idCaracteristica}`, formDataBackend, 
        { 
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        console.log("caracteristica editada:", response.data);
        const caracteristicasCopia = caracteristicas.slice()
        caracteristicasCopia[editando] = response.data
        setCaracteristicas(caracteristicasCopia)
        resetForm()
      })
      .catch((error) => {
        console.log(error);
      })
      setEditando(null);
    } else {
      console.log("Post nueva caracteristica",formData);
      formDataBackend.append("nombre",formData.nombre);
      formDataBackend.append("icono",formData.icono);
      axios.post(`${API_URL}/caracteristicas`, formDataBackend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      }
      ).then((response) => {
        console.log("caracteristicas:", response.data);
        setCaracteristicas([...caracteristicas, response.data])
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
    resetForm()
  };

  const handleEdit = (index) => {
    setEditando(index);
    setFormData(caracteristicas[index]);
    // const idCaracteristica=caracteristicas[index].id
    // axios.put(`${API_URL}/caracteristicas/${idCaracteristica}`)
  };

  const handleDelete = (index) => {
    // dispatch({ type: "ELIMINAR_CARACTERISTICA", payload: index });
    const idCaracteristica=caracteristicas[index].id
    console.log("indice de la variable:",index)
    console.log("idCaracteristica", idCaracteristica)
    axios.delete(`${API_URL}/caracteristicas/${idCaracteristica}`)
    .then((response) => {
      console.log("caracteristicas:", response.data);
      setCaracteristicas(caracteristicas.filter((_, i) => i !== index));
    })
    .catch((error) => {
      console.log(error);
    })
  };
  const resetForm = () => {
    setFormData({ nombre: "", icono: "" }); // Restablecer el estado del formulario
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpiar el input de tipo file
    }
  };


  return (
    <div className="admin-container" style={styles.adminContainer}>
      <h2 style={styles.title}>Administrar Características</h2>
      <div style={styles.formContainer}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la característica"
          value={formData.nombre}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="file"
          ref={fileInputRef}
          name="icono"
          onChange={handleChange}
          style={styles.input}
        />
        <button onClick={handleSave} style={styles.button}>
          {editando !== null ? "Actualizar" : "Guardar"}
        </button>
      </div>
      <ul style={styles.list}>
        {caracteristicas.map((car, i) => (
          <li key={i} style={styles.listItem}>
            <img src={car.icono} alt={car.nombre} style={styles.icon} />
            {car.nombre}
            <FaEdit onClick={() => handleEdit(i)} style={styles.iconButton} />
            <FaTrash onClick={() => handleDelete(i)} style={styles.iconButton} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  adminContainer: { padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" },
  title: { textAlign: "center", marginBottom: "20px" },
  formContainer: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "8px", border: "1px solid #ccc", borderRadius: "4px" },
  button: { padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px", borderBottom: "1px solid #ccc" },
  icon: { width: "30px", height: "30px", borderRadius: "4px" },
  iconButton: { cursor: "pointer", marginLeft: "10px" }
};

export default GestionCaracteristicas;