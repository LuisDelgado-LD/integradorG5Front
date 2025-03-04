import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";

const Galeria2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(GlobalContext);

  const habitacion = state.habitaciones.find((h) => h.id === parseInt(id));

  if (!habitacion) {
    return <p>Habitación no encontrada.</p>;
  }

  return (
    <div className="galeria-container">
      <h2 className="galeria-title">Galería de {habitacion.nombre}</h2>

      <div className="galeria-content">
        <div className="imagen-principal">
          <img src={habitacion.imagen} alt={habitacion.nombre} />
        </div>
      </div>

      <div className="galeria-secundaria">
          {state.privilegiosAlojamientos.slice(0, 4).map((servicio) => (
    <Card key={servicio.id} nombre={servicio.nombre} imagen={servicio.imagen} ruta={`/servicio/${servicio.id}`} />
      ))}
      </div>

      <button className="ver-mas" onClick={() => navigate(`/habitacion/${habitacion.id}`)}>
        Ver Más
      </button>

      <img src="/img/flecha.png" alt="Volver" className="back-arrow" onClick={() => navigate(-1)} />
    </div>
  );
};

export default Galeria2;
