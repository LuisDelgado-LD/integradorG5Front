import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Reserva = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const reserva = state.reserva;
  const usuario = state.usuario;

  const [fechaInicio, setFechaInicio] = useState(
    reserva ? new Date(reserva.fechaInicio) : new Date()
  );
  const [fechaFin, setFechaFin] = useState(
    reserva ? new Date(reserva.fechaFin) : new Date()
  );
  const [modalCalendarOpen, setModalCalendarOpen] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);

  if (!reserva) return <p>No hay reserva seleccionada.</p>;

  const guardarFechas = () => {
    dispatch({
      type: "SET_RESERVA",
      payload: {
        ...reserva,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
      },
    });
    setModalCalendarOpen(false);
  };

  // Renderizar iconos de patita según categoría
  const renderPaws = (categoria) => {
    const count =
      categoria === "Básico"
        ? 1
        : categoria === "Premium"
        ? 2
        : categoria === "VIP"
        ? 3
        : 0;
    return Array.from({ length: count }, (_, i) => (
      <img
        key={i}
        src="/img/iconoPatita.png"
        alt="Paw icon"
        className="paw-icon"
        style={{ width: "24px", marginRight: "3px" }}
      />
    ));
  };

  const caracteristicasPorCategoria = {
    Básico: ["estadia", "alimentacion", "paseos"],
    Premium: ["estadia", "alimentacion", "paseos", "peluqueria"],
    VIP: ["estadia", "alimentacion", "paseos", "entrenamiento"],
  };

  const featureIconMap = {
    estadia: "/img/estadia.png",
    alimentacion: "/img/alimentacion.png",
    paseos: "/img/paseos.png",
    peluqueria: "/img/peluqueria.png",
    entrenamiento: "/img/entrenamiento.png",
  };

  const caracteristicas =
    caracteristicasPorCategoria[reserva.habitacionCategoria] || [];

  return (
    <div className="reserva-container" style={{ display: "flex", padding: "30px", justifyContent: "space-between" }}>
      {/* Sección izquierda */}
      <div className="reserva-left" style={{ width: "50%", paddingRight: "20px" }}>
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>La estadía de tu mascota:</h3>
          <p><strong>Desde:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
          <p><strong>Hasta:</strong> {new Date(reserva.fechaFin).toLocaleDateString()}</p>
          <button className="edit-btn" style={{ marginTop: "5mm" }} onClick={() => setModalCalendarOpen(true)}>
            <img src="/img/Calendario.png" alt="Calendario" className="calendar-icon" /> Editar Fecha
          </button>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Datos del contacto:</h3>
          <p><strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Políticas de Cancelación</h3>
          <p>Cancelación gratuita hasta una semana antes de la fecha asignada.</p>
        </div>

        <button className="confirm-btn" onClick={() => setModalConfirmationOpen(true)}>
          Confirmar Reserva
        </button>
      </div>

      {/* Sección derecha visual estilo imagen */}
      <div className="reserva-right" style={{ width: "50%", backgroundColor: "#F9F9F9", borderRadius: "10px", padding: "20px", textAlign: "center" }}>
        <img
          src={reserva.habitacionImagen}
          alt="Habitación"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "15px"
          }}
        />

        <h2 style={{ marginBottom: "5px", color: "#30384D" }}>{reserva.habitacionNombre}</h2>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "15px", fontWeight: "bold", color: "#30384D" }}>
          <span>Categoría: {reserva.habitacionCategoria}</span>
          {renderPaws(reserva.habitacionCategoria)}
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "25px", marginTop: "10px" }}>
          {caracteristicas.map((carac, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "0.9rem", color: "#30384D" }}>
              <img
                src={featureIconMap[carac]}
                alt={carac}
                title={carac}
                style={{ width: "28px", height: "28px", marginBottom: "5px" }}
              />
              <span style={{ textTransform: "capitalize" }}>{carac}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal editar fechas */}
      {modalCalendarOpen && (
        <div className="modal-overlay" onClick={() => setModalCalendarOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Fechas</h3>
            <div className="datepickers">
              <label>Desde:</label>
              <DatePicker selected={fechaInicio} onChange={(date) => setFechaInicio(date)} />
              <label>Hasta:</label>
              <DatePicker selected={fechaFin} onChange={(date) => setFechaFin(date)} minDate={fechaInicio} />
            </div>
            <button className="save-btn" onClick={guardarFechas}>Guardar</button>
            <button className="close-btn" onClick={() => setModalCalendarOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Modal confirmación */}
      {modalConfirmationOpen && (
        <div className="modal-overlay" onClick={() => setModalConfirmationOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmación</h3>
            <p>✅ ¡Reserva confirmada con éxito!</p>
            <button className="close-btn" onClick={() => setModalConfirmationOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;