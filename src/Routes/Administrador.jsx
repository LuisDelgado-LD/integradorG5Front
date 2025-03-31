import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, Outlet , useNavigate } from "react-router-dom";
import ImageSelect from "../Components/ImageSelect";
import Pagination from "../Components/Pagination";
import axios from "axios";

const Administrador = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { API_URL } = state;
  const [dataTable, setDataTable] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataFeature, setDataFeature] = useState([]);
  const [imageList, setImageList] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [maestroEditado, setMaestroEditado] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    tipoProducto: "",
    descripcion: "",
    categoria: "",
    tamano: "",
    isDisponible: false,
    precioUnitario: "",
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    }
  };

  const handleOpenModal = async (maestro = null) => {
    if (maestro) {
      console.log("🆔 ID seleccionado:", maestro.id);
      try {
        const response = await axios.get(`https://petparadise.sytes.net/api/habitaciones/${maestro.id}`);
        const data = response.data;

  
        setFormData({
          id: data.id,
          nombre: data.nombre || "",
          tipoProducto: data.tipoProducto || "Producto",
          descripcion: data.descripcion || "",
          tamano: data.tamano || "",
          isDisponible: data.isDisponible || "false",
          precioUnitario: data.precioUnitario || "",
          categoria: data.categoria.id || "",
          imagen: null,
        });
      } catch (error) {
        console.error("❌ Error al obtener datos:", error);
        setError("No se pudieron cargar los datos.");
      }
    } else {
      setFormData({
        id: null,
        nombre: "",
        tipoProducto: "",
        descripcion: "",
        categoria: "",
        imagen: null,
      });
    }
    setMaestroEditado(maestro);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMaestroEditado(null);
    setError("");
  };

  const handleSave = async () => {
    console.log(formData);
    if (!formData.nombre || !formData.tipoProducto || !formData.descripcion || !formData.categoria) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    if (!formData.imagen) {
      setError("❌ Debes subir todas las imágenes.");
      return;
    }

    console.log("📤 Datos enviados:", formData);
    
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      imagen: { 
        url: formData.imagen, 
        esPrincipal: true 
      },
      categoria: { id: parseInt(formData.categoria) },
      tamano: formData.tamano,
      isDisponible: formData.isDisponible === "true" || formData.isDisponible === true,
      precioUnitario: parseFloat(formData.precioUnitario)
    };
    console.log("📤 Payload a enviar:", payload);
    try {
      let maestroResponse;
      if (maestroEditado) {
        // En modo edición, actualizamos directamente (suponiendo que el backend actualiza también imágenes)
        maestroResponse = await axios.put(`${API_URL}/habitaciones/${maestroEditado.id}`, payload, {
          headers: { "Content-Type": "application/json" }
        });
      } else {
 
        maestroResponse = await axios.post(`${API_URL}/habitaciones`, payload, {
          headers: { "Content-Type": "application/json" }
        });
      }


      if (maestroEditado) {
        dispatch({ type: "EDITAR_MAESTRO", payload: maestroResponse.data });
      } else {
        dispatch({ type: "AGREGAR_MAESTRO", payload: maestroResponse.data });
      }

      handleCloseModal();
      
      // Opcional: Actualiza la tabla volviendo a obtener la lista.
      const tableResponse = await axios.get(`${API_URL}/habitaciones`);
      const data = tableResponse.data.content.map(hab => ({
        id: hab.id,
        nombre: hab.nombre,
        tipo: 2,
        fecha: new Date().toISOString().split('T')[0]
      }));
      setDataTable(data);
      setCurrentPage(0);
    } catch (error) {
      console.error("❌ Error al guardar:", error);
      setError("Ocurrió un error al guardar los datos.");
    }

    // if (maestroEditado) {
    //   dispatch({ type: "EDITAR_MAESTRO", payload: { id: maestroEditado.id, ...formData } });
    // } else {
    //   dispatch({
    //     type: "AGREGAR_MAESTRO",
    //     payload: { id: state.maestros.length + 1, ...formData },
    //   });
    // }

    handleCloseModal();
  };

  const handleDelete = (id) => { 
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (!confirmDelete) return;
    
    axios.delete(`${API_URL}/habitaciones/${id}`)
    .then((response) => {
      console.log("Estado producto:", response);
      setDataTable(prevData => prevData.filter(item => item.id !== id));
      dispatch({ type: "ELIMINAR_MAESTRO", payload: id });
    })
    .catch((error) => console.error("Error al eliminar:", error));
  };

  /*const handleDelete = (id) => {
    console.log(id);
    dispatch({ type: "ELIMINAR_MAESTRO", payload: id });
  };*/

  useEffect(() => {
      axios.get(`${API_URL}/habitaciones?page=${currentPage}`)
      .then(response => {
        const data = response.data.content.map(hab => ({
          id: hab.id,
          nombre: hab.nombre,
          tipo: 2,
          fecha: new Date().toISOString().split('T')[0] // Fecha actual
        }));
        //console.log(data);
        setDataTable(data);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error("Error al obtener habitaciones:", error));
  }, [API_URL, currentPage]);

  useEffect(() => {
    axios.get(`${API_URL}/categorias`)
    .then(response => {
      const data = response.data.map(category => ({
        id: category.id,
        nombre: category.nombre,
      }));
      setDataCategory(data);
    })
    .catch(error => console.error("Error al obtener categorias:", error));
}, []);

useEffect(() => {
  axios.get(`${API_URL}/imagenes/todas`)
  .then(response => {
    const data = response.data.map(image => ({
      id: image.id,
      url: image.url,
    }));
    setImageList(data);
  })
  .catch(error => console.error("Error al obtener las imagenes:", error));
}, []);

useEffect(() => {
  axios.get(`${API_URL}/caracteristicas`)
  .then(response => {
    const data = response.data.map(feature => ({
      id: feature.id,
      nombre: feature.nombre,
    }));
    setDataFeature(data);
  })
  .catch(error => console.error("Error al obtener caracteristica:", error));
}, []);

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <nav className="admin-nav">
        <Link to="/administrador/gestion-maestro">Gestión de Maestro</Link>
        <Link to="/administrador/gestion-de-usuario">Gestión de Usuarios</Link>
      </nav>

      <Outlet />

      <h2>Gestión de Maestro</h2>

      {dataTable.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Maestro</th>
              <th>Fecha de modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((maestro) => (
              <tr key={maestro.id}>
                <td>{maestro.nombre}</td>
                <td>{maestro.tipo == 1 ? "Categoria" : "Producto"}</td>
                <td>{maestro.fecha}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleOpenModal(maestro)} />
                  <FaTrash className="delete-icon" onClick={() => handleDelete(maestro.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay maestros registrados.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <button className="add-user" onClick={() => handleOpenModal()}>➕ Añadir Maestro</button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={handleCloseModal}>✖</button>
            <h2>{maestroEditado ? "Editar Maestro" : "Nuevo Maestro"}</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="modal-content">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

              <label>Tipo de Maestro:</label>
              <input type="text" name="tipoProducto" value={formData.tipoProducto} onChange={handleChange} required />

              <label>Categoría:</label>
              <select name="categoria" value={formData.categoria} onChange={handleChange} required>
                <option value="">Seleccione una categoría</option>
                {dataCategory.map((cat, index) => (
                  <option key={index} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>

              <label>Tamaño:</label>
              <select
                name="tamano"
                value={formData.tamano || ""}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un tamaño</option>
                <option value="GRANDE">Grande</option>
                <option value="MEDIANA">Mediano</option>
                <option value="PEQUENA">Pequeño</option>
              </select>

              <label>Disponible:</label>
              <select
                name="isDisponible"
                value={formData.isDisponible !== undefined ? formData.isDisponible.toString() : ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isDisponible: e.target.value === "true",
                  })
                }
                required
              >
                <option value="">Seleccione disponibilidad</option>
                <option value="true">Disponible</option>
                <option value="false">No Disponible</option>
              </select>

              <label>Precio Unitario:</label>
              <input
                type="number"
                name="precioUnitario"
                value={formData.precioUnitario || ""}
                onChange={handleChange}
                required
              />

              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion || ''}
                onChange={handleChange}
                required
              ></textarea>

              {/* <label>Características:</label>
              <select
                name="caracteristicas"
                multiple
                value={formData.caracteristicas || []}
                onChange={(e) =>
                  setFormData({
                  ...formData,
                  caracteristicas: Array.from(e.target.selectedOptions, (option) => option.value),
                  })
                  }
                  className="multi-select">
                  {dataFeature?.length > 0 ? (
                    dataFeature.map((car, index) => (
                      <option key={index} value={car.id}>
                        {car.nombre}
                      </option>
                    ))
                  ) : (
                    <option disabled>Cargando opciones...</option>
                  )}
              
              </select> */}

              <label>Imagen Principal:</label>
              <ImageSelect
                options={imageList}
                value={formData.imagenId} // Guarda el id seleccionado
                onChange={(selected) =>
                  setFormData((prev) => ({ ...prev, imagenId: selected.value, imagen: selected.url }))
                }
                menuPortalTarget={document.body}  // Renderiza el menú en un portal
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (base) => ({
                    ...base,
                    maxHeight: '300px', // Limita la altura
                    overflowY: 'auto',
                  }),
                }}
              />
              {formData.imagen && <img src={formData.imagen} alt="Imagen seleccionada" className="preview-img" />}
            </div>

            <div className="modal-buttons">
              <button onClick={handleSave} className="save-button">Guardar</button>
              <button onClick={handleCloseModal} className="close-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;