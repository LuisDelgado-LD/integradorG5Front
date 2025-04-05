import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reservasService from "../services/ReservasService";

const ReservaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const res = await reservasService.getById(id);
        setReserva(res.data);
      } catch (error) {
        console.error("Error al obtener reserva:", error);
      }
    };

    cargarDetalle();
  }, [id]);

  const cancelarReserva = async () => {
    try {
      await reservasService.cancel(reserva.id);
      setReserva(null);
      setModalConfirmOpen(false);
      alert("Reserva cancelada con éxito.");
      navigate("/reservas");
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

  if (!reserva) return <p>Cargando reserva...</p>;

  const caracteristicas = caracteristicasPorCategoria[reserva.habitacionCategoria] || [];

  return (
    <div className="reserva-container">
      <div className="reserva-left">
        <h2 className="reserva-titulo">Detalle de la Reserva</h2>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Estadía:</h3>
          <p><strong>Desde:</strong> {new Date(reserva.fechaEntrada).toLocaleDateString("es-ES")}</p>
          <p><strong>Hasta:</strong> {new Date(reserva.fechaSalida).toLocaleDateString("es-ES")}</p>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Datos del Usuario:</h3>
          <p><strong>Nombre:</strong> {reserva.nombreUsuario}</p>
          <p><strong>Habitación:</strong> {reserva.nombreHabitacion}</p>
          <p><strong>Estado:</strong> {reserva.estado}</p>
          <p><strong>Total:</strong> ${reserva.precioTotal.toLocaleString("es-CL")}</p>
        </div>

        <div className="section" style={{ marginTop: "1cm" }}>
          <h3>Políticas de Cancelación</h3>
          <p>Cancelación gratuita hasta una semana antes de la fecha asignada.</p>
        </div>

        {reserva.estado === "CONFIRMADA" && (
          <button className="cancel-btn" onClick={() => setModalConfirmOpen(true)}>
            Cancelar Reserva
          </button>
        )}
      </div>

      <div className="reserva-right">
        <p className="habitacion-nombre">{reserva.nombreHabitacion}</p>
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

      {modalConfirmOpen && (
        <div className="modal-overlay" onClick={() => setModalConfirmOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/img/campana.png" alt="Campana" />
            <p>¿Estás seguro que deseas cancelar esta reserva?</p>
            <button className="btn-confirm" onClick={cancelarReserva}>Sí, cancelar</button>
            <button className="btn-cancel" onClick={() => setModalConfirmOpen(false)}>No, volver</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservaDetail;
