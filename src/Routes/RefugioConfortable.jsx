import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const RefugioConfortable = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="refugio-container">
      <h2 className="refugio-title">Refugio Confortable</h2>

      <div className="refugio-content">
        <img
          src="/img/RefugioConfortable.png"
          alt="Refugio Confortable"
          className="refugio-img"
          onClick={() => navigate("/Galeria2")}
        />

        <div className="refugio-description">
          <h3>Descripción</h3>
          <p>
            Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio entre amplitud y comodidad. 
            El Refugio Confortable tiene todo lo necesario para que tu mascota se sienta segura y feliz.
          </p>
        </div>

        <div className="refugio-services">
          <h3>Servicios incluidos</h3>
          <ul>
            <li><strong>Cama Amplia y Cómoda:</strong> Ideal para un descanso reparador.</li>
            <li><strong>Zona de Relax:</strong> Con cojines suaves y mantas para sentirse a gusto.</li>
            <li><strong>Juguetes de Estimulación Mental:</strong> Para mantener a tu mascota activa y entretenida.</li>
            <li><strong>Climatización:</strong> Aire acondicionado/calefacción para su confort.</li>
            <li><strong>Espacio de Privacidad:</strong> Un rincón tranquilo para descansar sin interrupciones.</li>
            <li><strong>Comida y Agua Fresca:</strong> Con servicio de reposición constante.</li>
            <li><strong>Limpieza Diaria:</strong> Un espacio siempre limpio y seguro.</li>
          </ul>
        </div>

        <Link to="/" className="back-home">
          <img src="/img/flecha.png" alt="Volver" />
        </Link>
      </div>
    </div>
  );
};

export default RefugioConfortable;