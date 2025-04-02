import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import reservasService from "../services/reservasService";

const Reserva = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const reserva = state.reserva;
  const usuario = state.usuario;

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [modalCalendarOpen, setModalCalendarOpen] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);
  const [confirmada, setConfirmada] = useState(false);

  useEffect(() => {
    if (reserva?.fechaInicio && reserva?.fechaFin) {
      try {
        setFechaInicio(new Date(reserva.fechaInicio));
        setFechaFin(new Date(reserva.fechaFin));
      } catch (e) {
        console.error("Error al convertir fechas de reserva:", e);
        setFechaInicio(new Date());
        setFechaFin(new Date());
      }
    } else {
      setFechaInicio(new Date());
      setFechaFin(new Date());
    }
  }, [reserva]);

  if (!reserva || !reserva.habitacionNombre) {
    return <p>No hay reserva seleccionada.</p>;
  }

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

  const confirmarReserva = async () => {
    try {
      const response = await reservasService.create({
        usuarioId: usuario.id,
        habitacionId: reserva.habitacionId,
        fechaEntrada: fechaInicio.toISOString().split("T")[0],
        fechaSalida: fechaFin.toISOString().split("T")[0],
      });
      console.log("Reserva confirmada:", response);
      setConfirmada(true);
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
    }
    setModalConfirmationOpen(true);
  };

  const renderPaws = (categoria) => {
    const count = categoria === "Básico" ? 1 : categoria === "Premium" ? 2 : 3;
    return Array.from({ length: count }).map((_, i) => (
      <img
        key={i}
        src="/img/iconoPatita.png"
        alt="Paw icon"
        className="paw-icon"
      />
    ));
  };

  const caracteristicas = reserva.habitacionCaracteristicas || [];

  return (
    <div className="reserva-container">
      <div className="reserva-left">
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>La estadía de tu mascota:</h3>
          <p>
            <strong>Desde:</strong> {fechaInicio?.toLocaleDateString?.() || "-"}
          </p>
          <p>
            <strong>Hasta:</strong> {fechaFin?.toLocaleDateString?.() || "-"}
          </p>
          <button
            className="edit-btn"
            style={{ marginTop: "5mm" }}
            onClick={() => setModalCalendarOpen(true)}
          >
            <img
              src="/img/Calendario.png"
              alt="Calendario"
              className="calendar-icon"
            /> Editar Fecha
          </button>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Datos de Contacto:</h3>
          <p>
            <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
          </p>
          <p>
            <strong>Email:</strong> {usuario.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {usuario.telefono}
          </p>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Políticas de Cancelación</h3>
          <p>Cancelación gratuita hasta una semana antes de la fecha asignada.</p>
        </div>

        <button className="confirm-btn" onClick={confirmarReserva}>
          Confirmar Reserva
        </button>
      </div>

      <div className="reserva-right">
        <img
          src={reserva.habitacionImagen}
          alt="Habitación"
          className="habitacion-imagen"
        />
        <p className="habitacion-nombre">{reserva.habitacionNombre}</p>
        <div className="habitacion-categoria">
          {renderPaws(reserva.habitacionCategoria)}
          <span className="categoria-text">{reserva.habitacionCategoria}</span>
        </div>
        <div className="caracteristicas">
          {caracteristicas.map((carac, index) => (
            <div key={index}>
              <img src={carac.iconoUrl} alt={carac.nombre} />
              <span>{carac.nombre}</span>
            </div>
          ))}
        </div>
      </div>

      {modalCalendarOpen && (
        <div className="modal-overlay" onClick={() => setModalCalendarOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Fechas</h3>
            <div className="datepickers">
              <div>
                <label>Desde:</label>
                <DatePicker
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                />
              </div>
              <div>
                <label>Hasta:</label>
                <DatePicker
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  minDate={fechaInicio}
                />
              </div>
            </div>
            <button className="save-btn" onClick={guardarFechas}>Guardar</button>
            <button className="close-btn" onClick={() => setModalCalendarOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {modalConfirmationOpen && (
        <div className="modal-overlay" onClick={() => setModalConfirmationOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{confirmada ? "Confirmación" : "Error"}</h3>
            <p>
              {confirmada
                ? "Se ha confirmado tu reserva."
                : "Ocurrió un error al confirmar la reserva."}
            </p>
            <button className="close-btn" onClick={() => setModalConfirmationOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;