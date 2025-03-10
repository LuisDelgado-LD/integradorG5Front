import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, Outlet , useNavigate } from "react-router-dom";

const Administrador = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [maestroEditado, setMaestroEditado] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    tipoProducto: "",
    descripcion: "",
    categoria: "",
    imagenPrincipal: null,
    imagenSecundaria: null,
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

  const handleOpenModal = (maestro = null) => {
    setMaestroEditado(maestro);
    setModalOpen(true);

    if (maestro) {
      setFormData({
        nombre: maestro.nombre,
        tipoProducto: maestro.tipoProducto,
        descripcion: maestro.descripcion,
        categoria: maestro.categoria,
        imagenPrincipal: maestro.imagenPrincipal || null,
        imagenSecundaria: maestro.imagenSecundaria || null,
      });
    } else {
      setFormData({
        nombre: "",
        tipoProducto: "",
        descripcion: "",
        categoria: "",
        imagenPrincipal: null,
        imagenSecundaria: null,
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setMaestroEditado(null);
    setError("");
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.tipoProducto || !formData.descripcion || !formData.categoria) {
      setError("❌ Todos los campos son obligatorios.");
      return;
    }

    if (!formData.imagenPrincipal || !formData.imagenSecundaria) {
      setError("❌ Debes subir ambas imágenes.");
      return;
    }

    if (maestroEditado) {
      dispatch({ type: "EDITAR_MAESTRO", payload: { id: maestroEditado.id, ...formData } });
    } else {
      dispatch({
        type: "AGREGAR_MAESTRO",
        payload: { id: state.maestros.length + 1, ...formData },
      });
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    dispatch({ type: "ELIMINAR_MAESTRO", payload: id });
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <nav className="admin-nav">
        <Link to="/administrador/gestion-maestro">Gestión de Maestro</Link>
        <Link to="/administrador/gestion-de-usuario">Gestión de Usuarios</Link>
      </nav>

      <Outlet />

      <h2>Gestión de Maestro</h2>

      {state.maestros.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Maestro</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.maestros.map((maestro) => (
              <tr key={maestro.id}>
                <td>{maestro.nombre}</td>
                <td>{maestro.tipoProducto}</td>
                <td>{maestro.categoria}</td>
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

      <button className="add-user" onClick={() => handleOpenModal()}>➕ Añadir Maestro</button>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{maestroEditado ? "Editar Maestro" : "Nuevo Maestro"}</h2>
            {error && <p className="error-message">{error}</p>}

            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

            <label>Tipo de Maestro:</label>
            <input type="text" name="tipoProducto" value={formData.tipoProducto} onChange={handleChange} required />

            <label>Categoría:</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Seleccione una categoría</option>
              {state.categorias.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>

            <label>Descripción:</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />

            <label>Imagen Principal:</label>
            <input type="file" name="imagenPrincipal" accept="image/*" onChange={handleImageChange} />
            {formData.imagenPrincipal && <img src={formData.imagenPrincipal} alt="Imagen Principal" width="100" />}

            <label>Imagen Secundaria:</label>
            <input type="file" name="imagenSecundaria" accept="image/*" onChange={handleImageChange} />
            {formData.imagenSecundaria && <img src={formData.imagenSecundaria} alt="Imagen Secundaria" width="100" />}

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