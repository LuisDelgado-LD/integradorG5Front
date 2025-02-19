import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const CuevaAcogedora = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="cueva-container">
      <h2 className="cueva-title">Cueva Acogedora</h2>

      <div className="cueva-content">
        <img
          src="/img/CuevaAcogedora.png"
          alt="Cueva Acogedora"
          className="cueva-img"
          onClick={() => navigate("/Galeria2")}
        />

        <div className="cueva-description">
          <h3>Descripción</h3>
          <p>
            Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. 
            La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida.
          </p>
        </div>

        <div className="cueva-services">
          <h3>Servicios incluidos</h3>
          <ul>
            <li><strong>Cama Compacta y Acolchonada:</strong> Perfecta para un descanso profundo y reconfortante.</li>
            <li><strong>Manta Cálida:</strong> Para los momentos más frescos, manteniendo el calor.</li>
            <li><strong>Espacio de Siesta Personalizada:</strong> Un rincón tranquilo con elementos relajantes.</li>
            <li><strong>Alimentación y Agua Siempre Fresca:</strong> Con recipientes cómodos y accesibles.</li>
            <li><strong>Ambiente Tranquilo:</strong> Sin ruidos ni distracciones, ideal para descansar.</li>
          </ul>
        </div>

        <Link to="/" className="back-home">
          <img src="/img/flecha.png" alt="Volver" />
        </Link>
      </div>
    </div>
  );
};

export default CuevaAcogedora;