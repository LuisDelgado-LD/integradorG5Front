import { useContext, useState } from "react";
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

  const [fechaInicio, setFechaInicio] = useState(
    reserva ? new Date(reserva.fechaInicio) : new Date()
  );
  const [fechaFin, setFechaFin] = useState(
    reserva ? new Date(reserva.fechaFin) : new Date()
  );
  const [modalCalendarOpen, setModalCalendarOpen] = useState(false);
  const [modalConfirmationOpen, setModalConfirmationOpen] = useState(false);

  if (!reserva) {
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
      const body = {
        usuarioId: usuario.id,
        habitacionId: reserva.habitacionId,
        fechaEntrada: new Date(reserva.fechaInicio).toISOString().split("T")[0],
        fechaSalida: new Date(reserva.fechaFin).toISOString().split("T")[0],
      };
      await reservasService.create(body);
      setModalConfirmationOpen(true);
    } catch (error) {
      alert("Ocurrió un error al confirmar la reserva");
      console.error(error);
    }
  };

  const renderPaws = (categoria) => {
    let count = 0;
    if (categoria === "Básico") count = 1;
    else if (categoria === "Premium") count = 2;
    else if (categoria === "VIP") count = 3;
    const paws = [];
    for (let i = 0; i < count; i++) {
      paws.push(
        <img
          key={i}
          src="/img/iconoPatita.png"
          alt="Paw icon"
          className="paw-icon"
        />
      );
    }
    return paws;
  };

  const caracteristicas =
    reserva.habitacionCaracteristicas || ["alimentacion", "peluqueria", "paseos"];

  const featureIconMap = {
    alimentacion: "/img/alimentacion.png",
    peluqueria: "/img/peluqueria.png",
    paseos: "/img/paseos.png",
    estadia: "/img/estadia.png",
    entrenamiento: "/img/entrenamiento.png",
  };

  return (
    <div className="reserva-container">
      <div className="reserva-left">
        <h2 className="reserva-titulo">Confirmar Reserva</h2>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>La estadía de tu mascota:</h3>
          <p>
            <strong>Desde:</strong>{" "}
            {new Date(reserva.fechaInicio).toLocaleDateString()}
          </p>
          <p>
            <strong>Hasta:</strong>{" "}
            {new Date(reserva.fechaFin).toLocaleDateString()}
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
            />{" "}
            Editar Fecha
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
          <p> Cancelación gratuita hasta una semana antes de la fecha asignada.</p>
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
              <img
                src={featureIconMap[carac]}
                alt={carac}
                className="feature-icon"
              />
              <span>{carac}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para editar fechas */}
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
            <button className="save-btn" onClick={guardarFechas}>
              Guardar
            </button>
            <button className="close-btn" onClick={() => setModalCalendarOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de confirmación */}
      {modalConfirmationOpen && (
        <div className="modal-overlay" onClick={() => setModalConfirmationOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmación</h3>
            <p>Se ha confirmado tu reserva.</p>
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
