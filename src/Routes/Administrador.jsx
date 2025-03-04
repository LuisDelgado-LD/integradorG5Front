import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DynamicForm from "../Components/DynamicForm";
import { FaTrash, FaEdit } from "react-icons/fa";

const Administrador = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [keyForm, setKeyForm] = useState(0);
  const [imagenes, setImagenes] = useState({ imagenPrincipal: null, imagenSecundaria: null });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setImagenes((prev) => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    }
  };

  const handleAgregarOEditarProducto = (formData, resetForm) => {
    const productoExistente = state.productos.find((p) => p.nombre.toLowerCase() === formData.nombre.toLowerCase());
    if (!formData.nombre || !formData.tipoProducto || !formData.descripcion || !formData.categoria) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    if (!formData.categoria) {
      alert("❌ Debes seleccionar al menos una categoría.");
      return;
    }

    if (!imagenes.imagenPrincipal || !imagenes.imagenSecundaria) {
      alert("❌ Debes subir ambas imágenes.");
      return;
    }

    if (!productoEditado && productoExistente) {
      alert("❌ Producto existente.");
      return;
    }

    const nuevoProducto = {
      ...formData,
      ...imagenes,
      fechaModificacion: new Date().toLocaleString(),
    };

    if (productoEditado) {
      dispatch({ type: "EDITAR_PRODUCTO", payload: nuevoProducto });
      setProductoEditado(null);
    } else {
      dispatch({ type: "AGREGAR_PRODUCTO", payload: nuevoProducto });
    }

    setMostrarFormulario(false);
    resetForm();
    setKeyForm((prev) => prev + 1);
    setImagenes({ imagenPrincipal: null, imagenSecundaria: null });
    alert("");
  };

  const handleEliminarProducto = (nombre) => {
    dispatch({ type: "ELIMINAR_PRODUCTO", payload: nombre });
  };

  const handleEditarProducto = (producto) => {
    setProductoEditado(producto);
    setMostrarFormulario(true);
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Maestro</h2>

      {state.productos.length > 0 && (
        <table className="product-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Maestro</th>
              <th>Categoría</th>
              <th>Última Modificación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {state.productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.tipoProducto}</td>
                <td>{producto.categoria}</td>
                <td>{producto.fechaModificacion}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleEditarProducto(producto)} />
                  <FaTrash className="delete-icon" onClick={() => handleEliminarProducto(producto.nombre)} />
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
        <div>
          <DynamicForm
            key={keyForm}
            title={productoEditado ? "Editar Maestro" : "Nuevo Maestro"}
            fields={[
              { name: "nombre", label: "Nombre", type: "text", required: true, defaultValue: productoEditado?.nombre || "" },
              { name: "tipoProducto", label: "Tipo de Maestro", type: "text", required: true, defaultValue: productoEditado?.tipoProducto || "" },
              { name: "categoria", label: "Categoría", type: "select", options: state.categorias, required: true, defaultValue: productoEditado?.categoria || "" },
              { name: "descripcion", label: "Descripción", type: "text", required: true, defaultValue: productoEditado?.descripcion || "" }
            ]}
            onSubmit={handleAgregarOEditarProducto}
          />

          <div>
            <label>Imagen Principal</label>
            <input type="file" name="imagenPrincipal" accept="image/*" onChange={handleImageChange} />
            {imagenes.imagenPrincipal && <img src={imagenes.imagenPrincipal} alt="Imagen Principal" width="100" />}
          </div>

          <div>
            <label>Imagen Secundaria</label>
            <input type="file" name="imagenSecundaria" accept="image/*" onChange={handleImageChange} />
            {imagenes.imagenSecundaria && <img src={imagenes.imagenSecundaria} alt="Imagen Secundaria" width="100" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrador;
