import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const preciosPorCategoria = {
  Básico: 5000,
  Premium: 10000,
  VIP: 30000,
};

const Reserva = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const reserva = state.reserva;

  const [editandoFechas, setEditandoFechas] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(new Date(reserva?.fechaInicio));
  const [fechaFin, setFechaFin] = useState(new Date(reserva?.fechaFin));
  const [telefono, setTelefono] = useState("");
  const [recibirActualizaciones, setRecibirActualizaciones] = useState(false);

  if (!reserva) {
    return <p>No hay reserva seleccionada.</p>;
  }

  const calcularDias = () => {
    const diferencia = (new Date(fechaFin) - new Date(fechaInicio)) / (1000 * 60 * 60 * 24);
    return diferencia + 1;
  };

  const totalAPagar = calcularDias() * (preciosPorCategoria[reserva.habitacionCategoria] || 0);

  const guardarFechas = () => {
    dispatch({
      type: "SET_RESERVA",
      payload: { ...reserva, fechaInicio: fechaInicio.toISOString(), fechaFin: fechaFin.toISOString() },
    });
    setEditandoFechas(false);
  };

  return (
    <div className="reserva-container">
      <h2 className="reserva-titulo">Confirma Reserva</h2>

      <div className="reserva-content">
        <div className="reserva-info">
          <h3>La estadía de tu mascota</h3>
          {!editandoFechas ? (
            <>
              <p><strong>Desde:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
              <p><strong>Hasta:</strong> {new Date(reserva.fechaFin).toLocaleDateString()}</p>
              <button className="edit-btn" onClick={() => setEditandoFechas(true)}>
                <img src="/img/editar.png" alt="Editar fechas" /> Editar Fechas
              </button>
            </>
          ) : (
            <>
              <DatePicker selected={fechaInicio} onChange={setFechaInicio} />
              <DatePicker selected={fechaFin} onChange={setFechaFin} minDate={fechaInicio} />
              <button className="save-btn" onClick={guardarFechas}>Guardar</button>
            </>
          )}

          <h3>Título requerido para tu mascota</h3>
          <label>Número de teléfono:</label>
          <input
            type="text"
            placeholder="Ingresa tu número"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />

          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={recibirActualizaciones}
              onChange={() => setRecibirActualizaciones(!recibirActualizaciones)}
            />
            <label>Agrega para recibir actualizaciones sobre tu mascota</label>
          </div>

          <h3>Políticas de Cancelación</h3>
          <p>🛑 Cancelación gratuita hasta una semana antes de la fecha asignada.</p>

          <button onClick={() => navigate("/")} className="cancel-btn">Cancelar Reserva</button>
        </div>

        <div className="reserva-detalle">
          <img src={reserva.habitacionImagen} alt="Habitación" className="reserva-imagen" />
          <p><strong>Habitación:</strong> {reserva.habitacionNombre}</p>
          <p><strong>Categoría:</strong> {reserva.habitacionCategoria}</p>
          <p><strong>Precio por día:</strong> ${preciosPorCategoria[reserva.habitacionCategoria]}</p>
          <p><strong>Total a pagar:</strong> ${totalAPagar}</p>
        </div>
      </div>
    </div>
  );
};

export default Reserva;