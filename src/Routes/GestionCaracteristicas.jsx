import { useState, useEffect } from "react";
import SoloEscritorio from "../Components/SoloEscritorio";

const GestionCaracteristicas = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({ id: null, nombre: "", imagen: "" });
  const [servicios, setServicios] = useState(() => {
    const guardados = localStorage.getItem("caracteristicas");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("caracteristicas", JSON.stringify(servicios));
  }, [servicios]);

  const abrirCrear = () => {
    setModoEdicion(false);
    setFormData({ id: null, nombre: "", imagen: "" });
    setModalOpen(true);
  };

  const abrirEditar = (servicio) => {
    setModoEdicion(true);
    setFormData(servicio);
    setModalOpen(true);
  };

  const eliminarServicio = (id) => {
    const confirmar = window.confirm("¿Deseas eliminar esta característica?");
    if (confirmar) {
      const actualizados = servicios.filter((s) => s.id !== id);
      setServicios(actualizados);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.imagen) {
      alert("❗ Todos los campos son obligatorios.");
      return;
    }

    let nuevos;
    if (modoEdicion) {
      nuevos = servicios.map((s) => (s.id === formData.id ? formData : s));
    } else {
      nuevos = [...servicios, { ...formData, id: Date.now() }];
    }

    setServicios(nuevos);
    setModalOpen(false);
  };

  return (
    <SoloEscritorio>
      <div className="gestion-maestro-page">
        <div className="container-gestion">
          <h2 className="titulo-gestion">Gestión de Características</h2>

          <table className="tabla-maestros">
            <thead>
              <tr>
                <th>Nombre del Servicio</th>
                <th>Última modificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => (
                <tr key={s.id}>
                  <td>
                    {s.nombre}
                    {s.imagen && (
                      <div>
                        <img
                          src={`/img/${s.imagen}`}
                          alt="Servicio"
                          style={{ width: "40px", marginTop: "5px" }}
                        />
                      </div>
                    )}
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                  <td className="acciones">
                    <span className="icono" onClick={() => abrirEditar(s)}>🖊️</span>
                    <span className="icono" onClick={() => eliminarServicio(s.id)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="boton-aniadir-container">
          <button className="btn-aniadir" onClick={abrirCrear}>
            ➕ Añadir Servicio
          </button>
        </div>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="cerrar-modal" onClick={() => setModalOpen(false)}>×</span>
              <h3>{modoEdicion ? "Editar Servicio" : "Registrar Servicio"}</h3>
              <form onSubmit={handleGuardar}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del servicio"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="imagen"
                  placeholder="Nombre de imagen (ej: spa.png)"
                  value={formData.imagen}
                  onChange={handleChange}
                  required
                />

                <button type="submit" className="btn-guardar">Guardar</button>
              </form>
            </div>
          </div>
        )}

        <div className="imagen-pie">
        <img src="/img/imagendepie.png" alt="Fondo" style={{ width: "100%", marginTop: "-2rem" }} />
        </div>
      </div>
    </SoloEscritorio>
  );
};

export default GestionCaracteristicas;