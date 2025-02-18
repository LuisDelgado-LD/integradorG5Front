import { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import { GlobalContext } from "../Context/utils/globalContext";
import useScrollVisibility from "../Hooks/useScrollVisibility";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const isVisible = useScrollVisibility();

  return (
    <div className={`home ${isVisible ? "visible" : "hidden"}`}>
      <div className="category-container">
        <h2 className="category-title">Categorías</h2>
        <div className="category-grid">
          <Link to="/palacio-peludo" className="category-card">
            <img src="/img/PalacioPeludo.png" alt="Palacio Peludo" className="category-img" />
            <p className="category-text">Palacio Peludo</p>
          </Link>
          <Link to="/refugio-confortable" className="category-card">
            <img src="/img/RefugioConfortable.png" alt="Refugio Confortable" className="category-img" />
            <p className="category-text">Refugio Confortable</p>
          </Link>
          <Link to="/Cueva-Acogedora" className="category-card">
            <img src="/img/CuevaAcogedora.png" alt="Cueva Acogedora" className="category-img" />
            <p className="category-text">Cueva Acogedora</p>
          </Link>
        </div>
      </div>

      <h1>Mascotas registradas</h1>
      <div className="card-grid">
        {state.mascotas.slice(0, 10).map((mascota) => (
          <Card key={mascota.id} {...mascota} />
        ))}
      </div>
    </div>
  );
};

export default Home;