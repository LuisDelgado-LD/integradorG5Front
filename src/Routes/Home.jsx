import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const [habitacionesAleatorias, setHabitacionesAleatorias] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const habitacionesPorPagina = 6;

  const aleatorizarHabitaciones = () => {
    const habitacionesDesordenadas = [...state.habitaciones].sort(() => Math.random() - 0.5);
    setHabitacionesAleatorias(habitacionesDesordenadas);
  };

  useEffect(() => {
    aleatorizarHabitaciones();
  }, [state.habitaciones]);

  const indiceUltimaHabitacion = paginaActual * habitacionesPorPagina;
  const indicePrimeraHabitacion = indiceUltimaHabitacion - habitacionesPorPagina;
  const habitacionesActuales = habitacionesAleatorias.slice(indicePrimeraHabitacion, indiceUltimaHabitacion);
  const totalPaginas = Math.ceil(habitacionesAleatorias.length / habitacionesPorPagina);

  return (
    <div className="home">
      <h2 className="section-title">Habitaciones Disponibles</h2>
      <div className="card-grid">
        {habitacionesActuales.map((habitacion) => (
          <Card key={habitacion.id} {...habitacion} />
        ))}
      </div>
      <div className="paginacion-container">
        <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>
          Anterior
        </button>
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index}
            onClick={() => setPaginaActual(index + 1)}
            className={paginaActual === index + 1 ? "activo" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>
          Siguiente
        </button>
      </div>
      <h2 className="section-title">Privilegios de Alojamiento</h2>
      <div className="card-grid">
        {state.privilegiosAlojamientos.map((privilegio) => (
          <Card key={privilegio.id} nombre={privilegio.nombre} imagen={privilegio.imagen} ruta="#" />
        ))}
      </div>
    </div>
  );
};

export default Home;
