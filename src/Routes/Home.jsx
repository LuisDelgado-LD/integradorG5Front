import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="home">
      <h2 className="category-title">Categorías</h2>
      <div className="category-box">
        {state.habitaciones.map((habitacion) => (
          <div key={habitacion.id} className="category-card" onClick={() => navigate(`/habitacion/${habitacion.id}`)}>
            <img src={habitacion.imagen} alt={habitacion.nombre} className="category-img" />
            <p className="category-text">{habitacion.nombre}</p>
          </div>
        ))}
      </div>
      <h2 className="services-title">Servicios Recomendados</h2>
      <div className="services-box">
        {state.servicios.map((servicio, index) => (
          <div key={index} className="service-card">
            <img src={servicio.imagen} alt={servicio.nombre} className="service-img" />
            <p className="service-text">{servicio.nombre}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Home;