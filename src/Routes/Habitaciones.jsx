import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Habitaciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    const encontrada = state.habitaciones.find(h => h.id === parseInt(id));
    setHabitacion(encontrada);
  }, [id, state.habitaciones]);

  if (!habitacion) return <p>Cargando habitación...</p>;

  return (
    <div className="habitacion-container">
      <div className="Auxiliares-detalle">
        <h2>{habitacion.nombre}</h2>
        <button className="back-home" onClick={() => navigate("/")}>
          <img src="/img/flecha.png" alt="Volver" />
        </button>
      </div>

      <div className="Contenido-Container">
        <div className="habitacion-img-container">
          <img className="habitacion-img" src={habitacion.imagen} alt={habitacion.nombre} />
          <button className="ver-mas" onClick={() => navigate(`/galeria/${habitacion.id}`)}>Ver más</button>
        </div>

        <div className="habitacion-content">
          <p className="habitacion-title">{habitacion.descripcion}</p>
          <p className="habitacion-categoria"><strong>Categoría:</strong> {habitacion.categoria}</p>
        </div>
      </div>
    </div>
  );
};

export default Habitaciones;