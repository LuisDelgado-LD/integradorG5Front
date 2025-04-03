import { useEffect, useState } from "react";
import habitacionesService from "../services/habitacionesService";

const GestionHabitaciones = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarHabitaciones = async () => {
    try {
      const res = await habitacionesService.getAll();
      setHabitaciones(res.data);
    } catch (err) {
      alert("Error al cargar habitaciones");
    } finally {
      setLoading(false);
    }
  };

  const eliminarHabitacion = async (id) => {
    if (window.confirm("¿Eliminar esta habitación?")) {
      try {
        await habitacionesService.delete(id);
        setHabitaciones(habitaciones.filter(h => h.id !== id));
      } catch {
        alert("No se pudo eliminar");
      }
    }
  };

  useEffect(() => {
    cargarHabitaciones();
  }, []);

  return (
    <div>
      <h2>Gestión de Habitaciones</h2>
      {loading ? <p>Cargando...</p> : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th><th>Tipo</th><th>Descripción</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {habitaciones.map(h => (
              <tr key={h.id}>
                <td>{h.nombre}</td>
                <td>{h.tipo}</td>
                <td>{h.descripcion}</td>
                <td>
                  <button onClick={() => eliminarHabitacion(h.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionHabitaciones;
