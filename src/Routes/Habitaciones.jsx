import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import habitacionesService from "../services/HabitacionesService";
import reservasService from "../services/ReservasService";
import Galeria from "./Galeria";

const Habitaciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const { usuario } = state;

  const [habitacion, setHabitacion] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [inicio, setInicio] = useState(null);
  const [fin, setFin] = useState(null);
  const [modalMensaje, setModalMensaje] = useState(null);
  const [modalGaleria, setModalGaleria] = useState(false);

  const cargarHabitacion = async () => {
    try {
      const res = await habitacionesService.getById(id);
      setHabitacion(res.data);
    } catch {
      setModalMensaje("Error al obtener habitación.");
    }
  };

  const cargarReservas = async () => {
    try {
      const res = await reservasService.getByHabitacion(id);
      const ocupadas = res.data.flatMap((r) => {
        const fechas = [];
        const fi = new Date(r.fechaInicio);
        const ff = new Date(r.fechaFin);
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

  const rangoOcupado = (inicioSel, finSel) => {
    if (!inicioSel || !finSel) return false;
    const actual = new Date(inicioSel);
    while (actual <= finSel) {
      if (fechasOcupadas.some((f) => f.toDateString() === actual.toDateString())) {
        return true;
      }
      actual.setDate(actual.getDate() + 1);
    }
    return false;
  };

  const handleReservar = () => {
    if (!usuario) {
      setModalMensaje("LOGIN");
      return;
    }

    if (!inicio || !fin) {
      setModalMensaje("Selecciona fechas válidas");
      return;
    }

    if (rangoOcupado(inicio, fin)) {
      setModalMensaje("La habitación no está disponible en esas fechas");
      return;
    }

    const habitacionPrincipal =
      habitacion?.imagenes?.find((img) => img.esPrincipal)?.url ||
      habitacion?.imagenes?.[0]?.url || "";

    const nuevaReserva = {
      habitacionId: habitacion.id,
      habitacionNombre: habitacion.nombre,
      habitacionCategoria: habitacion.categoria?.nombre || "",
      habitacionImagen: habitacionPrincipal,
      fechaInicio: inicio.toISOString(),
      fechaFin: fin.toISOString(),
    };

    dispatch({ type: "SET_RESERVA", payload: nuevaReserva });
    localStorage.setItem("reserva", JSON.stringify(nuevaReserva));
    navigate(`/reserva/${habitacion.id}`);
  };

  const renderPatitas = (categoria) => {
    const cantidad = categoria === "Básico" ? 1 : categoria === "Premium" ? 2 : 3;
    return Array.from({ length: cantidad }, (_, i) => (
      <img
        key={i}
        src="/img/iconoPatita.png"
        alt="Patita"
        style={{ width: "24px", marginRight: "4px" }}
      />
    ));
  };

  const isDateOccupied = (date) => {
    return fechasOcupadas.some((d) => d.toDateString() === date.toDateString());
  };

  const renderDayContents = (day, date) => {
    const isOcupada = isDateOccupied(date);
    return (
      <div
        style={isOcupada ? { backgroundColor: "#ffcccc", color: "#a00", borderRadius: "50%" } : {}}
      >
        {day}
      </div>
    );
  };

  if (!habitacion) return <p className="cargando">Cargando habitación...</p>;

  return (
    <div className="habitacion-container-Principal" style={{ padding: "20px" }}>
      <div className="Encabezado">
        <h2 className="habitacion-title">{habitacion.nombre}</h2>
        <img
          src="/img/flecha.png"
          alt="Volver"
          className="back-arrow"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="habitacion-container">
          <div className="habitacion-img-container">
            <img src={
                habitacion.imagenes.find((img) => img.esPrincipal)?.url ||
                habitacion.imagenes[0].url}
              alt={habitacion.nombre}
              className="habitacion-img"
            />
          </div>

          <div className="habitacion-content">
            <h4>Categoría:</h4>
            {renderPatitas(habitacion.categoria?.nombre)}
              <h4>Descripción:</h4>
              <p>{habitacion.descripcion}</p>
              <p>
                <strong>Disponibilidad:</strong>{" "}
                {habitacion.isDisponible ? "Disponible" : "No disponible"}
              </p>
          </div>
      </div>
      <button className="ver-mas" onClick={() => setModalGaleria(true)}>Ver más</button>
      <br />
      <br />
      <br />
      <div className="habitacion-container2">
        <div className="contenido1">
          <div>
            <h4 style={{ marginBottom: "5mm" }}>Servicios:</h4>
            <div className="caracteristicas">
              {habitacion.caracteristicas?.map((car) => (
                <div key={car.id} className="caracteristica-item">
                  <img src={car.iconoUrl} alt={car.nombre} />
                  <span>{car.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
          <div className="contenido2">
            <div className="date-picker-container">
              <div className="date-picker">
                <label className="date-label">Fecha Inicio</label>
                <DatePicker
                  selected={inicio}
                  onChange={(date) => setInicio(date)}
                  excludeDates={fechasOcupadas}
                  minDate={new Date()}
                  placeholderText="Selecciona fecha"
                  className="date-input"
                  renderDayContents={renderDayContents}
                />
              </div>
              <div className="date-picker">
                <label className="date-label">Fecha Fin</label>
                <DatePicker
                  selected={fin}
                  onChange={(date) => setFin(date)}
                  excludeDates={fechasOcupadas}
                  minDate={inicio || new Date()}
                  placeholderText="Selecciona fecha"
                  className="date-input"
                  renderDayContents={renderDayContents}
                />
              </div>
            </div>
            <button className="search-button" onClick={handleReservar}>
              Reservar
            </button>
          </div>
        </div>

      {modalMensaje && (
        <div className="modal-overlay" onClick={() => setModalMensaje(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalMensaje === "LOGIN" ? (
              <>
                <h3>Debes iniciar sesión para realizar la reserva</h3>
                <div className="modal-actions">
                  <button className="confirm-btn" onClick={() => navigate("/login")}>Iniciar sesión</button>
                  <button className="cancel-btn" onClick={() => navigate("/registro")}>Crear cuenta</button>
                </div>
              </>
            ) : (
              <>
                <p>{modalMensaje}</p>
                <button className="close-btn" onClick={() => setModalMensaje(null)}>Cerrar</button>
              </>
            )}
          </div>
        </div>
      )}

{modalGaleria && (
  <Galeria habitacion={habitacion} onClose={() => setModalGaleria(false)} />
)}
    </div>
  );
};

export default Habitaciones;