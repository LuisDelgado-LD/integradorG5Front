import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";

const Galeria2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useContext(GlobalContext);

  const servicios = [
    { id: 1, nombre: "Masajes Relajantes", imagen: "/img/MasajesRelajantes.png" },
    { id: 2, nombre: "Peluquería y Estilismo", imagen: "/img/PeluqueríaYEstilismo.png" },
    { id: 3, nombre: "Entrenamiento Personalizado", imagen: "/img/EntrenamientoPersonalizado.png" },
    { id: 4, nombre: "Paseos Guiados", imagen: "/img/PaseosGuiados.png" }
  ];

  return (
    <div className="galeria-container">
      <h2 className="galeria-title">Galería del producto</h2>
      
      <div className="galeria-content">
        <div className="imagen-principal">
          <img src="/img/RefugioConfortable.png" alt="Refugio Confortable" />
        </div>
      </div>
      
      <div className="galeria-secundaria">
        {servicios.map((servicio) => (
          <Card key={servicio.id} nombre={servicio.nombre} imagen={servicio.imagen} ruta="/detalle-servicio" />
        ))}
      </div>

      <button className="ver-mas" onClick={() => navigate("/detalle-galeria")}>
        Ver Más
      </button>

      <img
        src="/img/flecha.png"
        alt="Volver"
        className="back-arrow"
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default Galeria2;