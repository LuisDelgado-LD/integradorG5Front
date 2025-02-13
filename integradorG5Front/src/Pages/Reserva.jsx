import { useEffect, useState } from "react";
import reservaService from "../services/ReservaService";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    reservaService.getReservas().then(setReservas);
  }, []);

  return (
    <div>
      <h1>Reservas de Habitaciones</h1>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            Habitación: {reserva.habitacion} - Cliente: {reserva.cliente}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservas;