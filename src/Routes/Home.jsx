import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Home = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [habitacionesAleatorias, setHabitacionesAleatorias] = useState([]);

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => ({ id: item.id, nombre: item.nombre, imagen: item.imagen, ruta: item.ruta }));
  };

  useEffect(() => {
    if (state.habitaciones.length > 0) {
      setHabitacionesAleatorias(shuffleArray(state.habitaciones));
    }
  }, [currentPage, state.habitaciones]);

  if (!state || !state.habitaciones) {
    return <p>Cargando habitaciones...</p>;
  }

  const totalPages = Math.ceil(state.habitaciones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const habitacionesPaginadas = habitacionesAleatorias.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="home">
      <h2 className="category-title">Categorías</h2>
      <div className="category-box">
        {habitacionesPaginadas.map((habitacion) => (
          <div key={habitacion.id} className="category-card" onClick={() => navigate(`/galeria/${habitacion.id}`)}>
            <img src={habitacion.imagen} alt={habitacion.nombre} className="category-img" />
            <p className="category-text">{habitacion.nombre}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          ⬅ Anterior
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={currentPage === i + 1 ? "active" : ""}>
            {i + 1}
          </button>
        ))}

        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Siguiente ➡
        </button>
      </div>
    </div>
  );
};

export default Home;