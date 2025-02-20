import { GlobalContext } from "../Context/utils/globalContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

const PalacioPeludo = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="palacio-container">
      <h2 className="palacio-title">Palacio Peludo</h2>

      <div className="palacio-content">
        <img
          src="/img/PalacioPeludo.png"
          alt="Palacio Peludo"
          className="palacio-img"
          onClick={() => navigate("/Galeria2", { state: { imagen: "/img/PalacioPeludo.png" } })}
          style={{ cursor: "pointer" }}
        />

        <div className="palacio-description">
          <h3>Descripción</h3>
          <p>
            Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza.
            Con zonas para descansar, jugar y explorar, el Palacio Peludo ofrece una comodidad total,
            con camas extra grandes, alfombras suaves y un ambiente relajante.
          </p>
        </div>

        <div className="palacio-services">
          <h3>Servicios incluidos</h3>
          <ul>
            <li><strong>Cama Extra Grande:</strong> Súper cómoda para descansar con amplitud.</li>
            <li><strong>Alfombra Suave y Calentita:</strong> Para momentos de relax y confort.</li>
            <li><strong>Sistema de Climatización:</strong> Temperatura ajustable para cualquier estación del año.</li>
            <li><strong>Área de Ventilación Natural:</strong> Para disfrutar de un aire fresco y saludable.</li>
            <li><strong>Iluminación Ambiental:</strong> Lámparas suaves para crear una atmósfera relajante.</li>
            <li><strong>Servicios de Hidratación y Alimentación Personalizada:</strong> Con bebederos y comederos automáticos.</li>
          </ul>
        </div>

        <Link to="/" className="back-home">
          <img src="/img/flecha.png" alt="Volver" />
        </Link>
      </div>
    </div>
  );
};

export default PalacioPeludo;