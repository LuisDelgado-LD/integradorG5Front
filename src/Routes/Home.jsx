import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();

  const categorias = [
    { nombre: "Palacio Peludo", img: "/img/PalacioPeludo.png", ruta: "/PalacioPeludo" },
    { nombre: "Refugio Confortable", img: "/img/RefugioConfortable.png", ruta: "/RefugioConfortable" },
    { nombre: "Cueva Acogedora", img: "/img/CuevaAcogedora.png", ruta: "/CuevaAcogedora" }
  ];

  const serviciosRecomendados = [
    { nombre: "Masajes Relajantes", img: "/img/MasajesRelajantes.png" },
    { nombre: "Peluquería y Estilismo", img: "/img/PeluqueríaYEstilismo.png" },
    { nombre: "Entrenamiento Personalizado", img: "/img/EntrenamientoPersonalizado.png" },
    { nombre: "Paseos Guiados", img: "/img/PaseosGuiados.png" },
    { nombre: "Psicólogo", img: "/img/Psicologo.png" }
  ];

  return (
    <div className="home">
      <h2 className="category-title">Categorías</h2>
      <div className="category-box">
        {categorias.map((categoria, index) => (
          <div key={index} className="category-card" onClick={() => navigate(categoria.ruta)}>
            <img src={categoria.img} alt={categoria.nombre} className="category-img" />
            <p className="category-text">{categoria.nombre}</p>
          </div>
        ))}

      </div>
      <h2 className="services-title">Servicios Recomendados</h2>
      <div className="services-box">
        {serviciosRecomendados.map((servicio, index) => (
          <div key={index} className="service-card">
            <img src={servicio.img} alt={servicio.nombre} className="service-img" />
            <p className="service-text">{servicio.nombre}</p>
          </div>
        ))}
        
      </div>
      <h1>Mascotas registradas</h1>
      <div className="card-grid">
        {state.mascotas.slice(0, 10).map((mascota) => (
          <div key={mascota.id} className="card">
            <h3>{mascota.nombreMascota}</h3>
            <p>Raza: {mascota.raza}</p>
            <p>Tamaño: {mascota.tamano}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;