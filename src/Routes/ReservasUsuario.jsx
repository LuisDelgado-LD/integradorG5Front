import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import reservasService from "../services/ReservasService";
import { useNavigate } from "react-router-dom";

const ReservasUsuario = () => {
  const { state } = useContext(GlobalContext);
  const { usuario } = state;
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReservas = async () => {
      if (!usuario?.id) return;
      try {
        console.log(usuario);
        const res = await reservasService.getByUsuario(usuario.id);
        const data = res.data?.content || [];
        console.log(res.data.content)
        setReservas(data);
      } catch (err) {
        console.error("Error al cargar reservas:", err);
      }
    };

    cargarReservas();
  }, [usuario]);

  return (
    <div className="reservas-container">
      <h2>Mis Reservas</h2>
      {reservas.length === 0 ? (
        <p>No tienes reservas aún.</p>
      ) : (
        reservas.map((r) => (
          <div
            key={r.id}
            className="reserva-card"
            onClick={() => navigate(`/reserva-detail/${r.id}`)}
          >
            <h3>{r.nombreHabitacion}</h3>
            <p>
              <strong>Desde:</strong>{" "}
              {new Date(r.fechaEntrada).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Hasta:</strong>{" "}
              {new Date(r.fechaSalida).toLocaleDateString("es-ES")}
            </p>
            <p>
              <strong>Estado:</strong> {r.estado}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservasUsuario;
