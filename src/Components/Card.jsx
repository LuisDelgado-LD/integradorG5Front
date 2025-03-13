import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Card = ({ id, nombre, imagen, ruta }) => {
  const navigate = useNavigate();

  const manejarClick = () => {
    if (ruta && ruta !== "#") {
      navigate(ruta);
    } else {
      navigate(`/habitacion/${id}`);
    }
  };

  return (
    <div className="card" onClick={manejarClick}>
      <img
        src={imagen}
        alt={nombre}
        className="card-img clickable"
      />
      <h3 className="card-title">🐾 {nombre}</h3>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  ruta: PropTypes.string
};

export default Card;