import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useNavigate } from "react-router-dom";

const ConfirmacionReserva = () => {
  const { state } = useContext(GlobalContext);
  const reserva = state.reserva;
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (!reserva) {
      setMostrarModal(true);
    }
  }, [reserva]);

  const cerrarModal = () => {
    setMostrarModal(false);
    navigate("/"); // redirige al Home u otra ruta deseada
  };

  if (!reserva) {
    return (
      <>
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <img src="/img/campana.png" alt="Campana" />
              <p>No tiene reserva activa</p>
              <div className="modal-buttons">
                <button onClick={cerrarModal} className="btn-confirm">Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="confirmacion-container">
      <h2>✅ ¡Tu reserva ha sido confirmada!</h2>
      <p><strong>Habitación:</strong> {reserva.habitacionNombre}</p>
      <p><strong>Desde:</strong> {new Date(reserva.fechaInicio).toLocaleDateString()}</p>
      <p><strong>Hasta:</strong> {new Date(reserva.fechaFin).toLocaleDateString()}</p>
    </div>
  );
};

export default ConfirmacionReserva;
