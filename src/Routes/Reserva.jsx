import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import reservasService from "../services/ReservasService";

const Reserva = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const reserva = state.reserva;
  const usuario = state.usuario;

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [modalCalendarOpen, setModalCalendarOpen] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);

  useEffect(() => {
    if (!reserva) {
      const storedReserva = localStorage.getItem("reserva");
      if (storedReserva) {
        const parsed = JSON.parse(storedReserva);
        dispatch({ type: "SET_RESERVA", payload: parsed });
        setFechaInicio(new Date(parsed.fechaInicio));
        setFechaFin(new Date(parsed.fechaFin));
      } else {
        navigate("/");
      }
    } else {
      setFechaInicio(new Date(reserva.fechaInicio));
      setFechaFin(new Date(reserva.fechaFin));
    }
  }, [reserva, dispatch, navigate]);

  useEffect(() => {
    if (reserva) {
      localStorage.setItem("reserva", JSON.stringify(reserva));
    }
  }, [reserva]);

  if (!reserva) return <p>No hay reserva seleccionada.</p>;

  const guardarFechas = () => {
    const updatedReserva = {
      ...reserva,
      fechaInicio: fechaInicio.toISOString(),
      fechaFin: fechaFin.toISOString(),
    };
    dispatch({ type: "SET_RESERVA", payload: updatedReserva });
    localStorage.setItem("reserva", JSON.stringify(updatedReserva));
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

      const reservaId = response.data?.id;
      const updatedReserva = {
        ...reserva,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        reservaId,
      };

      dispatch({ type: "SET_RESERVA", payload: updatedReserva });
      localStorage.setItem("reserva", JSON.stringify(updatedReserva));
      setModalConfirmationOpen(true);
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
      alert("Error al confirmar la reserva. Intenta más tarde.");
    }
  };

  const cancelarReserva = async () => {
    try {
      if (reserva.reservaId) {
        await reservasService.cancel(reserva.reservaId);
      }
      dispatch({ type: "SET_RESERVA", payload: null });
      localStorage.removeItem("reserva");
      navigate("/");
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      alert("No se pudo cancelar la reserva.");
    }
  };

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
    <div className="reserva-container">
      <div className="reserva-left">
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>La estadía de tu mascota:</h3>
          <p>
            <strong>Desde:</strong> {fechaInicio?.toLocaleDateString("es-ES")}
          </p>
          <p>
            <strong>Hasta:</strong> {fechaFin?.toLocaleDateString("es-ES")}
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
          <h3>Datos del contacto:</h3>
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
          <p>
            Cancelación gratuita hasta una semana antes de la fecha asignada.
          </p>
        </div>

        {reserva.reservaId ? (
          <button className="cancel-btn" onClick={cancelarReserva}>
            Cancelar Reserva
          </button>
        ) : (
          <button className="confirm-btn" onClick={confirmarReserva}>
            Confirmar Reserva
          </button>
        )}
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
              <img src={featureIconMap[carac]} alt={carac} />
              <span style={{ textTransform: "capitalize" }}>{carac}</span>
            </div>
          ))}
        </div>
      </div>

      {modalCalendarOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalCalendarOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Fechas</h3>
            <div className="datepickers">
              <label>Desde:</label>
              <DatePicker
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
              />
              <label>Hasta:</label>
              <DatePicker
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                minDate={fechaInicio}
              />
            </div>
            <button className="save-btn" onClick={guardarFechas}>
              Guardar
            </button>
            <button
              className="close-btn"
              onClick={() => setModalCalendarOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {modalConfirmationOpen && (
        <div
          className="modal-overlay"
          onClick={() => setModalConfirmationOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/img/listo.png" alt="Listo" style={{ width: 80, marginBottom: 10 }} />
            <p>¡Reserva confirmada con éxito!</p>
            <button
              className="btn-confirm"
              onClick={() => setModalConfirmationOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reserva;
