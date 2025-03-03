import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ id, nombre, imagen, ruta }) => {
  return (
    <div className="card">
      <img src={imagen} alt={nombre} className="card-img" />
      <h3 className="card-title">{nombre}</h3>
      <Link to={ruta} className="btn">Ver más</Link>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  ruta: PropTypes.string.isRequired,
};

export default Card;