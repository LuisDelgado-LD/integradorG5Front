import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const [indexImagen, setIndexImagen] = useState(Math.floor(Math.random() * state.habitaciones.length));

  useEffect(() => {
    if (paginaActual === 1) {
      const interval = setInterval(() => {
        setIndexImagen((prevIndex) => (prevIndex + 1) % state.habitaciones.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [paginaActual, state.habitaciones.length]);
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  return (
    <div className="home">
      {state.habitaciones.length > 0 && (
        <>
          {paginaActual === 1 ? (
            <div className="banner-container">
              <img
                src={state.habitaciones[indexImagen].imagen}
                alt={`Habitación ${state.habitaciones[indexImagen].nombre}`}
                className="banner-img clickable"
                onClick={() => (window.location.href = `/galeria/${state.habitaciones[indexImagen].id}`)}
              />
            </div>
          ) : (
            <div className="habitacion-info">
              <h2>{state.habitaciones[paginaActual - 1].nombre}</h2>
              <img
                src={state.habitaciones[paginaActual - 1].imagen}
                alt={state.habitaciones[paginaActual - 1].nombre}
                className="habitacion-img"
              />
              <p>{state.habitaciones[paginaActual - 1].descripcion}</p>
            </div>
          )}

          <div className="pagination-container">
            {state.habitaciones.map((_, index) => (
              <button
                key={index + 1}
                className={`pagination-btn ${paginaActual === index + 1 ? "active" : ""}`}
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;