import { useState } from "react";
import Modal from "../Components/Modal";

const GestionServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState(null);

  const handleEdit = (servicio) => {
    setSelectedServicio(servicio);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Eliminar este servicio?")) {
      setServicios(servicios.filter((s) => s.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedServicio) {
      setServicios(servicios.map((s) => s.id === selectedServicio.id ? { ...s, ...data } : s));
    } else {
      setServicios([...servicios, { id: servicios.length + 1, ...data }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="admin-content">
      <h2>Gestión de Servicios</h2>

      <table className="maestro-table">
        <thead>
          <tr>
            <th>Nombre de Servicio</th>
            <th>Última Modificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s, index) => (
            <tr key={index}>
              <td>{s.nombre}</td>
              <td>{s.fecha}</td>
              <td>
                <img src="/img/editar.png" alt="Editar" onClick={() => handleEdit(s)} />
                <img src="/img/papelera.png" alt="Eliminar" onClick={() => handleDelete(s.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => { setModalOpen(true); setSelectedServicio(null); }}>
        <img src="/img/mas.png" alt="Añadir" /> Añadir Servicio
      </button>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedServicio}
      />
    </div>
  );
};

export default GestionServicios;