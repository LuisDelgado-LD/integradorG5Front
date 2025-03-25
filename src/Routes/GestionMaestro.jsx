import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DynamicForm from "../Components/DynamicForm";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";



const GestionMaestro = () => {
  const { state } = useContext(GlobalContext);
  const { API_URL } = state;
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [maestroEditado, setMaestroEditado] = useState(null);
  const [keyForm, setKeyForm] = useState(0);
  const [productos, setProductos] = useState([]);
  useEffect(()=>{
    axios.get(`${API_URL}/habitaciones/all`)
  .then(response => {
    console.log("productos:", response.data.content);
    const productos = response.data.content.map(element => ({
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion,
      categoria: element.categoria.nombre,
      caracteristicas: element.caracteristicas,
      tipo: element.tamano,
      valor: element.precioUnitario
    }));
    setProductos(productos);
  })
  .catch(error => console.log(error));
  })
  const handleAgregarOEditarMaestro = (formData, resetForm) => { 
    if (!formData.nombre || !formData.tipo || !formData.descripcion || !formData.categoria || !formData.caracteristicas) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    if (maestroEditado) {
      axios.put(`${API_URL}/habitaciones/${maestroEditado.id}`, formData)
      .then((response) => {
        console.log("Estado producto:", response);
        setProductos(productos.map(producto => producto.id === maestroEditado.id ? formData : producto));
      })
      .catch((error) => console.log(error));
      setMaestroEditado(null);
    } else {
      const formDataAdicional = {
        ...formData,
        isDisponible: true
      }
      axios.post(`${API_URL}/habitaciones`, formDataAdicional)
      .then((response)=>{
        console.log("Estado producto:", response);
        setProductos([...productos,  ...formData ]);
      })
      .catch((error) => {
        console.log(error);
      })
    }

    setMostrarFormulario(false);
    resetForm();
    setKeyForm((prev) => prev + 1);
  };

  const handleEliminarMaestro = (id) => { 
    axios.delete(`${API_URL}/habitaciones/${id}`)
    .then((response) => {
      console.log("Estado producto:", response);
      setProductos(productos.filter(producto => producto.id !== id));
    })
    .catch((error) => console.log(error));
  };

  const handleEditarMaestro = (producto) => {
    setMaestroEditado(producto);
    setMostrarFormulario(true);
  };

  return (
    <div className="admin-content">
      <h2>Gestión de productos</h2>

      {productos.length > 0 && (
        <table className="maestro-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Descripcion</th>
              <th>Caracteristicas</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.caracteristicas}</td>
                <td>{producto.tipo}</td>
                <td>{producto.valor}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleEditarMaestro(producto)} />
                  <FaTrash className="delete-icon" onClick={() => handleEliminarMaestro(producto.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Cerrar formulario" : "Añadir Maestro"}
      </button>

      {mostrarFormulario && (
        <DynamicForm
          key={keyForm}
          title={maestroEditado ? "Editar Producto" : "Nuevo Producto"}
          fields={[
            { name: "nombre", label: "Nombre", type: "text", required: true, defaultValue: maestroEditado?.nombre || "" },
            { name: "categoria", label: "Categoria", type: "text", required: true, defaultValue: maestroEditado?.categoria || "" },
            { name: "descripcion", label: "Descripción", type: "text", required: true, defaultValue: maestroEditado?.descripcion || "" },
            { name: "caracteristicas", label: "Caracteristicas", type: "text", required: true, defaultValue: maestroEditado?.caracteristicas || "" },
            { name: "Valor", label: "Caracteristicas", type: "number", required: true, defaultValue: maestroEditado?.valor || "" },
            { name: "tipo", label: "Tipo", type: "text", required: true, defaultValue: maestroEditado?.tipo || "" }
          ]}
          onSubmit={handleAgregarOEditarMaestro}
        />
      )}
    </div>
  );
};

export default GestionMaestro;