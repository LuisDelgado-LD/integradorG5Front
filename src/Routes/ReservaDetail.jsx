import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import reservasService from "../services/ReservasService";

const ReservaDetail = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);

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

  if (!reserva) return <p>Cargando reserva...</p>;

  return (
    <div className="reserva-detalle" style={{ padding: "2rem" }}>
      <h2>Reserva #{reserva.id}</h2>
      <p><strong>Usuario:</strong> {reserva.nombreUsuario}</p>
      <p><strong>Habitación:</strong> {reserva.nombreHabitacion}</p>
      <p><strong>Fecha Entrada:</strong> {new Date(reserva.fechaEntrada).toLocaleDateString("es-ES")}</p>
      <p><strong>Fecha Salida:</strong> {new Date(reserva.fechaSalida).toLocaleDateString("es-ES")}</p>
      <p><strong>Estado:</strong> {reserva.estado}</p>
      <p><strong>Total:</strong> ${reserva.precioTotal.toLocaleString("es-CL")}</p>
    </div>
  );
};

export default ReservaDetail;
