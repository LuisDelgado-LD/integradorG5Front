import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import habitacionesService from "../services/habitacionesService";
import reservasService from "../services/reservasService";

const Habitaciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const { usuario } = state;

  const [habitacion, setHabitacion] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);

  const cargarHabitacion = async () => {
    try {
      const res = await habitacionesService.getById(id);
      setHabitacion(res.data);
    } catch {
      alert("Error al obtener habitación");
    }
  };

  const cargarReservas = async () => {
    try {
      const res = await reservasService.getByHabitacion(id);
      const ocupadas = res.data.flatMap((r) => {
        const fi = new Date(r.fechaInicio);
        const ff = new Date(r.fechaFin);
        const fechas = [];
        while (fi <= ff) {
          fechas.push(new Date(fi));
          fi.setDate(fi.getDate() + 1);
        }
        return fechas;
      });
      setFechasOcupadas(ocupadas);
    } catch {
      setFechasOcupadas([]);
    }
  };

  useEffect(() => {
    cargarHabitacion();
    cargarReservas();
  }, [id]);

  const handleReservar = () => {
    if (!usuario) {
      navigate("/login", {
        state: { mensaje: "Debes iniciar sesión para reservar." },
      });
    } else if (inicio && fin) {
      dispatch({
        type: "SET_RESERVA",
        payload: { habitacion, inicio, fin },
      });
      navigate(`/reserva/${id}`);
    } else {
      alert("Selecciona fechas válidas");
    }
  };

  if (!habitacion) return <p>Cargando...</p>;

  return (
    <div className="habitacion-container">
      <div className="habitacion-img-container">
        <img
          src={
            habitacion.imagenes?.find((img) => img.esPrincipal)?.url ||
            habitacion.imagenes?.[0]?.url
          }
          alt={habitacion.nombre}
          className="habitacion-img"
        />
      </div>

      <div className="Contenido-Container">
        <div className="habitacion-content">
          <h2 className="habitacion-title">{habitacion.nombre}</h2>
          <p className="habitacion-descripcion">{habitacion.descripcion}</p>
          <p className="habitacion-tamano"><strong>Tamaño:</strong> {habitacion.tamano}</p>
          <p className="habitacion-precio"><strong>Precio:</strong> ${habitacion.precioUnitario.toLocaleString()}</p>
          <p className="habitacion-disponible">
            <strong>Disponibilidad:</strong>{" "}
            {habitacion.isDisponible ? "Disponible" : "No disponible"}
          </p>
        </div>

        {/* Categoría */}
        {habitacion.categoria && (
          <div className="habitacion-categoria">
            <img
              src={habitacion.categoria.imagenUrl}
              alt={habitacion.categoria.nombre}
              className="card-img"
              style={{ maxWidth: "100px" }}
            />
            <span>{habitacion.categoria.nombre}</span>
          </div>
        )}

        {/* Características */}
        <div className="caracteristicas">
          {habitacion.caracteristicas?.map((car) => (
            <div key={car.id}>
              <img src={car.iconoUrl} alt={car.nombre} />
              <span>{car.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendario + Botón */}
      <div className="date-picker-container">
        <div className="date-picker">
          <label className="date-label">Fecha Inicio</label>
          <div className="calendar-box">
            <DatePicker
              selected={inicio}
              onChange={(date) => setInicio(date)}
              excludeDates={fechasOcupadas}
              placeholderText="Selecciona fecha"
              className="date-input"
            />
          </div>
        </div>
        <div className="date-picker">
          <label className="date-label">Fecha Fin</label>
          <div className="calendar-box">
            <DatePicker
              selected={fin}
              onChange={(date) => setFin(date)}
              excludeDates={fechasOcupadas}
              placeholderText="Selecciona fecha"
              className="date-input"
            />
          </div>
        </div>
        <button className="search-button" onClick={handleReservar}>
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Habitaciones;
