import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import SoloEscritorio from "../Components/SoloEscritorio";

const GestionHabitaciones = () => {
  const { state } = useContext(GlobalContext);
  const token = state.token;

  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({ id: null, nombre: "", tipo: "", descripcion: "" });
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch("https://petparadise.sytes.net/api/habitaciones", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setHabitaciones(Array.isArray(data) ? data : []);
        } else {
          console.error("Error al obtener habitaciones: " + res.status);
        }
      } catch (err) {
        console.error("Error de red al obtener habitaciones:", err);
      }
    };
    fetchHabitaciones();
  }, [token]);

  const abrirCrear = () => {
    setModoEdicion(false);
    setFormData({ id: null, nombre: "", tipo: "", descripcion: "" });
    setModalOpen(true);
  };

  const abrirEditar = (habitacion) => {
    setModoEdicion(true);
    setFormData(habitacion);
    setModalOpen(true);
  };

  const eliminarHabitacion = async (id) => {
    if (window.confirm("¿Deseas eliminar esta habitación?")) {
      try {
        const res = await fetch(`https://petparadise.sytes.net/api/habitaciones/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          setHabitaciones(habitaciones.filter(h => h.id !== id));
        } else {
          alert("Error al eliminar habitación");
        }
      } catch {
        alert("Error de red al eliminar habitación");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    const url = modoEdicion
      ? `https://petparadise.sytes.net/api/habitaciones/${formData.id}`
      : "https://petparadise.sytes.net/api/habitaciones";

    const method = modoEdicion ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          tipo: formData.tipo,
          descripcion: formData.descripcion,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (modoEdicion) {
          setHabitaciones(habitaciones.map(h => h.id === data.id ? data : h));
        } else {
          setHabitaciones([...habitaciones, data]);
        }
        setModalOpen(false);
      } else {
        const errorText = await res.text();
        console.error("Error al guardar habitación:", errorText);
        alert("Error al guardar habitación");
      }
    } catch (err) {
      console.error("Error de red al guardar habitación", err);
      alert("Error de red al guardar habitación");
    }
  };

  return (
    <SoloEscritorio>
      <div className="gestion-maestro-page">
        <div className="container-gestion">
          <h2 className="titulo-gestion">Gestión de Habitaciones</h2>

          <table className="tabla-maestros">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {habitaciones.map((h) => (
                <tr key={h.id}>
                  <td>{h.nombre}</td>
                  <td>{h.tipo}</td>
                  <td>{h.descripcion}</td>
                  <td>
                    <span className="icono" onClick={() => abrirEditar(h)}>🖊️</span>
                    <span className="icono" onClick={() => eliminarHabitacion(h.id)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="boton-aniadir-container">
            <button className="btn-aniadir" onClick={abrirCrear}>Añadir Habitación</button>
          </div>

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <h3>{modoEdicion ? "Editar Habitación" : "Nueva Habitación"}</h3>
                <form onSubmit={handleGuardar}>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="tipo"
                    placeholder="Tipo (Pequeño, Mediano...)"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                  />
                  <button type="submit" className="btn-guardar">Guardar</button>
                  <button type="button" className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </SoloEscritorio>
  );
};

export default GestionHabitaciones;