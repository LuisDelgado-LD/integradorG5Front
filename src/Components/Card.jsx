import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ id, nombre, imagen, ruta }) => {
  const navigate = useNavigate();

  const manejarClick = () => {
    if (ruta !== "#") {
      navigate(`/galeria/${id}`);
    }
  };

  return (
    <div className="card">
      <img 
        src={imagen} 
        alt={nombre} 
        className="card-img clickable" 
        onClick={manejarClick} 
      />
      <h3 className="card-title">{nombre}</h3>
      {ruta !== "#" && <Link to={ruta} className="btn">Ver más</Link>}
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
