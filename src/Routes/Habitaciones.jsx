import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const iconoPatita = "/img/iconoPatita.png";
const iconosCategoria = {
  Básico: 1,
  Premium: 2,
  VIP: 3,
};

const descripcionesCategoria = {
  Básico:
    "Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza. Con zonas para descansar, jugar y explorar, el Palacio Peludo ofrece una comodidad total, con camas extra grandes, alfombras suaves y un ambiente relajante. Perfecto para aquellas mascotas que disfrutan de su espacio y buscan sentirse como verdaderos reyes.",
  Premium:
    "Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio entre amplitud y comodidad. El Refugio Confortable tiene todo lo necesario para que tu mascota se sienta segura y feliz. Con un diseño práctico, camas cómodas y rincones para la privacidad, es el lugar perfecto para descansar después de un día lleno de aventuras.",
  VIP:
    "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda, una atmósfera cálida y una decoración que invita al descanso. Ideal para mascotas más reservadas que buscan un refugio especial donde se sientan protegidos y en paz.",
};

const caracteristicasPorCategoria = {
  Básico: ["estadia", "alimentacion", "paseos"],
  Premium: ["estadia", "alimentacion", "paseos", "peluqueria"],
  VIP: ["estadia", "alimentacion", "paseos", "peluqueria", "entrenamiento"],
};

const iconosCaracteristicas = {
  estadia: "/img/estadia.png",
  alimentacion: "/img/alimentacion.png",
  paseos: "/img/paseos.png",
  peluqueria: "/img/peluqueria.png",
  entrenamiento: "/img/entrenamiento.png",
};

const Habitaciones = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);
  const [habitacion, setHabitacion] = useState(null);

  useEffect(() => {
    const encontrada = state.habitaciones.find((h) => h.id === parseInt(id));
    setHabitacion(encontrada);
  }, [id, state.habitaciones]);

  if (!habitacion) return <p>Cargando habitación...</p>;

  const categoria = habitacion.categoria;
  const descripcion = descripcionesCategoria[categoria];
  const caracteristicas = caracteristicasPorCategoria[categoria] || [];

  return (
    <div className="habitacion-container" style={{ padding: "20px" }}>
      <div className="Auxiliares-detalle">
        <h2>{habitacion.nombre}</h2>
        <button className="back-home" onClick={() => navigate("/")}>
          <img src="/img/flecha.png" alt="Volver" />
        </button>
      </div>
      <div className="Contenido-Container">
        <div
          className="habitacion-img-container"
          style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <img className="habitacion-img" src={habitacion.imagen} alt={habitacion.nombre} />
          <button
            className="ver-mas"
            onClick={() => navigate(`/galeria/${habitacion.id}`)}
            style={{ marginTop: "1cm" }}
          >
            Ver más
          </button>
        </div>
        <div style={{ marginTop: "1cm", textAlign: "left" }}>
          <p className="habitacion-categoria">
            <strong>Categoría:</strong> {categoria}
            {Array.from({ length: iconosCategoria[categoria] || 0 }).map((_, i) => (
              <img
                key={i}
                src={iconoPatita}
                alt="Patita"
                style={{ width: "20px", marginLeft: "5px" }}
              />
            ))}
          </p>
          <p className="habitacion-title" style={{ marginTop: "1cm" }}>
            <strong>Descripción:</strong> {descripcion}
          </p>
        </div>
        <div style={{ marginTop: "1cm", textAlign: "left" }}>
          <p><strong>Características:</strong></p>
          <div style={{ display: "flex", gap: "1cm", flexWrap: "wrap" }}>
            {caracteristicas.map((car, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={iconosCaracteristicas[car]} alt={car} width="32" />
                <span style={{ fontWeight: 500 }}>{car.charAt(0).toUpperCase() + car.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habitaciones;