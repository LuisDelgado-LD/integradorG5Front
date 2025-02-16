import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../index.css";

const Card = ({ id, nombreMascota, raza, tamano }) => {
  return (
    <div className="card">
      <h3>{nombreMascota}</h3>
      <p>Raza: {raza}</p>
      <p>Tamaño: {tamano}</p>
      <Link to={`/detail/${id}`} className="btn">Ver Detalle</Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  nombreMascota: PropTypes.string.isRequired,
  raza: PropTypes.string.isRequired,
  tamano: PropTypes.string.isRequired,
};

export default Card;