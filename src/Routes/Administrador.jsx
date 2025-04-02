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
    imagenPrincipal: null,
    imagenSecundaria: null,
    imagenAdicional1:null,
    imagenAdicional2: null,
    imagenAdicional3: null,
    caracteristicas: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   const { name, files } = e.target;
  //   if (files.length > 0) {
  //     const file = files[0];
  
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: file, // Guarda el archivo real
  //       [`${name}Preview`]: URL.createObjectURL(file), // Guarda la URL solo para la vista previa
  //     }));
  //   }
  // };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
  
    // Si el usuario ha subido una nueva imagen
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [`${name}Preview`]: reader.result, // Esta es la vista previa de la imagen subida
        }));
      };
      reader.readAsDataURL(files[0]); // Crear la vista previa de la imagen
    }
  
    // Actualizar el archivo real en el formulario (o mantener la imagen anterior si no hay una nueva)
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0] || prevData[name], // Guarda la imagen seleccionada o mantiene la anterior
    }));
  };
  

  const handleOpenModal = async (maestro = null) => {
    if (maestro) {
      try {
        const response = await axios.get(`https://petparadise.sytes.net/api/habitaciones/${maestro.id}`);
        const data = response.data;
        console.log(data);
  
        setFormData({
          id: data.id,
          nombre: data.nombre || "",
          tipoProducto: data.tipoProducto || "Producto",
          descripcion: data.descripcion || "",
          tamano: data.tamano || "",
          isDisponible: data.isDisponible || "false",
          precioUnitario: data.precioUnitario || "",
          categoria: data.categoria.id || "",
          imagenPrincipal: data.imagenes.find(img => img.esPrincipal)?.url || null,
          imagenSecundaria: data.imagenes.find(img => !img.esPrincipal)?.url || null,
          imagenAdicional1: data.imagenes[2]?.url || null,
          imagenAdicional2: data.imagenes[3]?.url || null, 
          imagenAdicional3: data.imagenes[4]?.url || null,
          imagenPrincipalPreview: null,
          imagenSecundariaPreview: null,
          imagenAdicional1Preview: null,
          imagenAdicional2Preview: null,
          imagenAdicional3Preview: null,
          caracteristicas: data.caracteristicas ||[],
          
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
        imagenPrincipal: null,
        imagenSecundaria: null,
        imagenAdicional1:null,
        imagenAdicional2: null,
        imagenAdicional3: null,
        caracteristicas: [],
        imagenPrincipalPreview: null,
        imagenSecundariaPreview: null,
        imagenAdicional1Preview: null,
        imagenAdicional2Preview: null,
        imagenAdicional3Preview: null,
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
    if (!formData.nombre || !formData.tipoProducto || !formData.descripcion || !formData.categoria) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    if (!formData.imagenPrincipal || !formData.imagenSecundaria || !formData.imagenAdicional1 || !formData.imagenAdicional2 || !formData.imagenAdicional3) {
      setError("❌ Debes subir todas las imágenes.");
      return;
    }

    if (!formData.caracteristicas) {
      setError("❌ Debes elegir las caracteristicas.");
      return;
    }

    console.log("📤 Datos enviados:", formData);
    
    const payload = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      imagen: { 
        url: "https://ejemplo.com/imagen.jpg", 
        esPrincipal: true 
      },
      categoria: { id: parseInt(formData.categoria) },
      tamano: formData.tamano,
      isDisponible: formData.isDisponible === "true" || formData.isDisponible === true,
      precioUnitario: parseFloat(formData.precioUnitario),
      caracteristicas: formData.caracteristicas,
    };
    console.log("📤 Payload a enviar:", payload);
    try {
      let maestroResponse;
      if (maestroEditado) {
        
        maestroResponse = await axios.put(`${API_URL}/habitaciones/${maestroEditado.id}`, payload, {
          headers: { "Content-Type": "application/json" }
        });

        const updatedImages = await handleUpdateImages(maestroEditado.id, formData, maestroResponse.data.imagenes);
        console.log("📸 Imágenes actualizadas:", updatedImages);
      } else {
 
        maestroResponse = await axios.post(`${API_URL}/habitaciones`, payload, {
          headers: { "Content-Type": "application/json" }
        });

        const uploadedImages = await handleUploadImages(maestroResponse.data.id);
        console.log("📸 Imágenes subidas:", uploadedImages);
  
        if (uploadedImages.imagenPrincipal) {
          await axios.put(`${API_URL}/imagenes/${uploadedImages.imagenPrincipal}/principal?habitacionId=${maestroResponse.data.id}`, {
            headers: { "Content-Type": "application/json" }
          });
          console.log("⭐ Imagen principal establecida.");
        }
      }

      const habitacionId = maestroResponse.data.id;

      if(habitacionId){
        await handleSaveCaracteristicas(habitacionId);
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
    handleCloseModal();
  };

  const handleSaveCaracteristicas = async (habitacionId) => {
    try {
      const caracteristicasIds = formData.caracteristicas.map(caracteristica => caracteristica.id);
      const response = await axios.put(`${API_URL}/habitaciones/${habitacionId}/caracteristicas`, caracteristicasIds, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("✅ Características agregadas:", response.data);
    } catch (error) {
      console.error("❌ Error al agregar características:", error);
    }
  };
  
  const deleteImage = (imageId) => {
    axios.delete(`${API_URL}/imagenes/${imageId}`)
      .then(response => {
        console.log("Imagen eliminada correctamente", response);
      })
      .catch(error => {
        console.error("Error al eliminar imagen", error);
      });
  };

  const handleUploadImages = async (habitacionId) => {
    const imageFiles = {
      imagenPrincipal: formData.imagenPrincipal,
      imagenSecundaria: formData.imagenSecundaria,
      imagenAdicional1: formData.imagenAdicional1,
      imagenAdicional2: formData.imagenAdicional2,
      imagenAdicional3: formData.imagenAdicional3,
    };
  
    const uploadedImages = {};
  
    try {
      for (const [key, file] of Object.entries(imageFiles)) {
        if (file) {
          const formDataImage = new FormData();
          formDataImage.append("imagen", file);
  
          const response = await axios.post(`${API_URL}/imagenes/${habitacionId}`, formDataImage, {
            headers: { "Content-Type": "multipart/form-data" }
          });
  
          uploadedImages[key] = response.data.id;
        }
      }
    } catch (error) {
      console.error("❌ Error al subir imágenes:", error);
      setError("Ocurrió un error al subir las imágenes.");
    }
  
    return uploadedImages;
  };
  
  const handleUpdateImages = async (habitacionId, formData, existingImages) => {
    const imageFiles = {
      imagenPrincipal: formData.imagenPrincipal,
      imagenSecundaria: formData.imagenSecundaria,
      imagenAdicional1: formData.imagenAdicional1,
      imagenAdicional2: formData.imagenAdicional2,
      imagenAdicional3: formData.imagenAdicional3,
    };
  
    const updatedImages = { imagenPrincipal: null, imagenSecundaria: [], imagenAdicional: [] };
  
    // Recorrer las imágenes que se han subido
    for (const [key, file] of Object.entries(imageFiles)) {
      if (file) {
        const existingImage = existingImages.find(img => img.url === file.url);
        // Si la imagen no existe o si es diferente a la anterior, se debe eliminar y subir la nueva
        if (!existingImage) {
          const formDataImage = new FormData();
          formDataImage.append("imagen", file);
  
          try {
            const response = await axios.post(`${API_URL}/imagenes/${habitacionId}`, formDataImage, {
              headers: { "Content-Type": "multipart/form-data" },
            });
  
            updatedImages[key] = response.data.id;
  
            if (key === "imagenPrincipal") {
              await axios.put(`${API_URL}/imagenes/${response.data.id}/principal?habitacionId=${habitacionId}`, {
                headers: { "Content-Type": "application/json" },
              });
              console.log("⭐ Imagen principal actualizada.");
            }
          } catch (error) {
            console.error("❌ Error al subir imagen:", error);
          }
        } else {
          updatedImages[key] = existingImage.id;
        }
      }
    }
    const imagesToDelete = existingImages.filter(existingImage => {
      // Si la imagen actual no está entre las nuevas imágenes, se debe eliminar
      return !Object.values(updatedImages).includes(existingImage.id);
    });

    for (const image of imagesToDelete) {
      try {
        await axios.delete(`${API_URL}/imagenes/${image.id}`, {
          headers: { "Content-Type": "application/json" },
        });
        console.log(`Imagen ${image.id} eliminada.`);
      } catch (error) {
        console.error("❌ Error al eliminar imagen:", error);
      }
    }
  
    return updatedImages;
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

              <label>Características:</label>
              <select
                name="caracteristicas"
                multiple
                value={formData.caracteristicas.map(car => car.id) || []}  // Mostrar los ids seleccionados
                onChange={(e) => {
                  const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);  // obtener solo los ids seleccionados
                  setFormData({
                    ...formData,
                    caracteristicas: selectedIds.map(id => ({ id }))  // actualizar el estado con los objetos completos
                  });
                }}
                className="multi-select"
              >
                {dataFeature?.length > 0 ? (
                  dataFeature.map((car, index) => (
                    <option key={index} value={car.id}>
                      {car.nombre}
                    </option>
                  ))
                ) : (
                  <option disabled>Cargando opciones...</option>
                )}
              </select>


              {/*<label>Imagen Principal:</label>
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
                    maxHeight: '300px',
                    overflowY: 'auto',
                  }),
                }}
              />
              {formData.imagen && <img src={formData.imagen} alt="Imagen seleccionada" className="preview-img" />}*/}
              {maestroEditado && <p>Esta editando los datos, por favor vuelve a subir todas las imágenes</p>}
              <label>Imagen Principal:</label>
              <input type="file" name="imagenPrincipal" accept="image/*" onChange={handleImageChange} />
              {formData.imagenPrincipalPreview ? (
                <img src={formData.imagenPrincipalPreview} alt="Imagen Principal" width="100" />
              ) : formData.imagenPrincipal ? (
                <img src={formData.imagenPrincipal} alt="Imagen Principal" width="100" />
              ) : (
                <p>No hay imagen</p>
              )}
  
              <label>Imagen Secundaria:</label>
              <input type="file" name="imagenSecundaria" accept="image/*" onChange={handleImageChange} />
              {formData.imagenSecundariaPreview ? (
                <img src={formData.imagenSecundariaPreview} alt="Imagen Secundaria" width="100" />
              ) : formData.imagenSecundaria ? (
                <img src={formData.imagenSecundaria} alt="Imagen Secundaria" width="100" />
              ) : (
                <p>No hay imagen</p>
              )}

              <label>Imagen Principal:</label>
              <input type="file" name="imagenAdicional1" accept="image/*" onChange={handleImageChange} />
              {formData.imagenAdicional1Preview ? (
                <img src={formData.imagenAdicional1Preview} alt="Imagen Adicional 1" width="100" />
              ) : formData.imagenAdicional1 ? (
                <img src={formData.imagenAdicional1} alt="Imagen Adicional 1" width="100" />
              ) : (
                <p>No hay imagen</p>
              )}
  
              <label>Imagen Secundaria:</label>
              <input type="file" name="imagenAdicional2" accept="image/*" onChange={handleImageChange} />
              {formData.imagenAdicional2Preview ? (
                <img src={formData.imagenAdicional2Preview} alt="Imagen Adicional 2" width="100" />
              ) : formData.imagenAdicional2 ? (
                <img src={formData.imagenAdicional2} alt="Imagen Adicional 2" width="100" />
              ) : (
                <p>No hay imagen</p>
              )}

              <label>Imagen Secundaria:</label>
              <input type="file" name="imagenAdicional3" accept="image/*" onChange={handleImageChange} />
              {formData.imagenAdicional3Preview ? (
                <img src={formData.imagenAdicional3Preview} alt="Imagen Adicional 3" width="100" />
              ) : formData.imagenAdicional3 ? (
                <img src={formData.imagenAdicional3} alt="Imagen Adicional 3" width="100" />
              ) : (
                <p>No hay imagen</p>
              )}

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