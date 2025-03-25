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
              <th>Tipo</th>
              <th>Última Modificación</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {state.maestros.map((maestro, index) => (
              <tr key={index}>
                <td>{maestro.nombre}</td>
                <td>{maestro.tipo}</td>
                <td>{maestro.fechaModificacion}</td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => handleEditarMaestro(maestro)} />
                  <FaTrash className="delete-icon" onClick={() => handleEliminarMaestro(maestro.nombre)} />
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
          title={maestroEditado ? "Editar Maestro" : "Nuevo Maestro"}
          fields={[
            { name: "nombre", label: "Nombre", type: "text", required: true, defaultValue: maestroEditado?.nombre || "" },
            { name: "tipo", label: "Tipo de Maestro", type: "text", required: true, defaultValue: maestroEditado?.tipo || "" },
            { name: "descripcion", label: "Descripción", type: "text", required: true, defaultValue: maestroEditado?.descripcion || "" }
          ]}
          onSubmit={handleAgregarOEditarMaestro}
        />
      )}
    </div>
  );
};

export default GestionMaestro;