import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DynamicForm from "../Components/DynamicForm";
import { FaTrash, FaEdit } from "react-icons/fa";

const GestionMaestro = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [maestroEditado, setMaestroEditado] = useState(null);
  const [keyForm, setKeyForm] = useState(0);

  const handleAgregarOEditarMaestro = (formData, resetForm) => {
    if (!formData.nombre || !formData.tipo || !formData.descripcion) {
      alert("❌ Todos los campos son obligatorios.");
      return;
    }

    const nuevoMaestro = {
      ...formData,
      fechaModificacion: new Date().toLocaleString(),
    };

    if (maestroEditado) {
      dispatch({ type: "EDITAR_MAESTRO", payload: nuevoMaestro });
      setMaestroEditado(null);
    } else {
      dispatch({ type: "AGREGAR_MAESTRO", payload: nuevoMaestro });
    }

    setMostrarFormulario(false);
    resetForm();
    setKeyForm((prev) => prev + 1);
  };

  const handleEliminarMaestro = (nombre) => {
    dispatch({ type: "ELIMINAR_MAESTRO", payload: nombre });
  };

  const handleEditarMaestro = (maestro) => {
    setMaestroEditado(maestro);
    setMostrarFormulario(true);
  };

  return (
    <div className="admin-content">
      <h2>Gestión de Maestro</h2>

      {state.maestros.length > 0 && (
        <table className="maestro-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Maestro</th>
              <th>Última Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.maestros.map((maestro, index) => (
              <tr key={index}>
                <td>{maestro.nombre}</td>
                <td>{maestro.tipo}</td>
                <td>{maestro.fechaModificacion}</td>
                <td>
                  <img src="/img/editar.png" alt="Editar" onClick={() => handleEditarMaestro(maestro)} style={{ cursor: "pointer", width: "20px", marginRight: "10px" }} />
                  <img src="/img/papelera.png" alt="Eliminar" onClick={() => handleEliminarMaestro(maestro.nombre)} style={{ cursor: "pointer", width: "20px" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "20px" }}>
        <img src="/img/mas.png" alt="Añadir" style={{ width: "24px" }} />
        Añadir Maestro
      </button>

      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-content">
            <DynamicForm
              key={keyForm}
              title={maestroEditado ? "Editar Maestro" : "Gestión de Maestros"}
              fields={[
                { name: "tipo", label: "Tipo de Maestro", type: "select", required: true, options: ["Categoría", "Producto"], defaultValue: maestroEditado?.tipo || "" },
                { name: "nombre", label: "Nombre del Maestro", type: "text", required: true, defaultValue: maestroEditado?.nombre || "" },
                { name: "descripcion", label: "Añade la descripción del maestro", type: "text", required: true, defaultValue: maestroEditado?.descripcion || "" },
                { name: "caracteristicas", label: "Características Incluidas", type: "select", required: false, options: state.caracteristicas.map((c) => c.nombre), defaultValue: maestroEditado?.caracteristicas || [] },
              ]}
              onSubmit={handleAgregarOEditarMaestro}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 auto" }}>
                <img src="/img/mas.png" alt="Agregar Imagen" style={{ width: "24px" }} />
                Agregar Imagen Principal
              </button>
              <button className="save-button" style={{ marginTop: "16px" }}>
                Guardar
              </button>
              <img src="/img/flecha.png" alt="Cerrar" onClick={() => setMostrarFormulario(false)} style={{ cursor: "pointer", marginTop: "20px", width: "30px" }} />
            </div>
          </div>
        </div>
      )}

      <img src="/img/imagendeinicio.png" alt="Fondo" style={{ width: "100%", marginTop: "2rem" }} />
    </div>
  );
};

export default GestionMaestro;
