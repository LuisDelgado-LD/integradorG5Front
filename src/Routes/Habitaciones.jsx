import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Habitaciones = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

 /* const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    fetch(`https://petparadise.sytes.net/api/habitaciones/${id}`)
      .then(response => response.json())
      .then(data => setHabitacion(data))
      .catch(error => console.error("Error obteniendo la habitación:", error));
  }, [id]);*/
  const habitacion = state.habitaciones.find(h => h.id === parseInt(id));

  if (!habitacion) {
    return <p>Habitación no encontrada</p>;
  }

  return (
    <div className="habitacion-container">
      <div className="Auxiliares-detalle">
        <h2>{habitacion.nombre}</h2>
        <Link to="/" className="back-home">
          <img src="/img/flecha.png" alt="Volver" />
        </Link>
      </div>

      <div className="Contenido-Container">
        <div className="habitacion-img-container">
          <img className="habitacion-img" src={habitacion.imagen} alt={habitacion.nombre} onClick={() => navigate("/Galeria2")} />
        </div>

        <div className="habitacion-content">
          <p className="habitacion-title">{habitacion.descripcion}</p>
          <p className="habitacion-tamano"><strong>Tamaño:</strong> {habitacion.tamano}</p>
          <p className="habitacion-disponible"><strong>Disponible:</strong> {habitacion.isDisponible ? "Sí" : "No"}</p>
          <p className="habitacion-precio"><strong>Precio:</strong> ${habitacion.precioUnitario}</p>
        </div>
      </div>
    </div>
  );
};

export default Habitaciones;
