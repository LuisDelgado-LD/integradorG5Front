import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";
import habitacionesService from "../services/HabitacionesService";
import caracteristicasService from "../services/CaracteristicasService";

const Home = () => {
  const { dispatch, state } = useContext(GlobalContext);

  const [habitaciones, setHabitaciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState([]);

  const cargarHabitaciones = async (pagina = 0) => {
    setLoading(true);
    try {
      const res = await habitacionesService.getByPage(pagina);
      setHabitaciones(res.content);
      setTotalPaginas(res.totalPages);
      setPaginaActual(res.number);
    } catch (error) {
      console.error("Error al cargar habitaciones:", error);
      alert("Error al cargar habitaciones");
    } finally {
      setLoading(false);
    }
  };

  const cargarCaracteristicas = async () => {
    try {
      const res = await caracteristicasService.getAll();
      dispatch({ type: "SET_CARACTERISTICAS", payload: res });
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const res = await habitacionesService.getCategorias();
      setCategorias(res.data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    }
  };

  useEffect(() => {
    cargarHabitaciones();
    cargarCaracteristicas();
    cargarCategorias();
  }, []);

  return (
    <div className="home">
      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Categoría</h2>
        <div className="card-grid">
          {categorias.map((cat, idx) => (
            <div key={idx} className="card categoria">
              <img
                src={
                  localStorage.getItem(`cat-img-${cat.nombre}`)
                    ? localStorage.getItem(`cat-img-${cat.nombre}`)
                    : `/img/${cat.patitas}patita${cat.patitas > 1 ? "s" : ""}.png`
                }
                alt={cat.nombre}
                className="card-img"
              />
              <h3 className="card-title">{cat.nombre}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Habitaciones</h2>
        {loading ? (
          <p>Cargando habitaciones...</p>
        ) : (
          <>
            <div className="card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {habitaciones.map((hab) => (
                <Card
                  key={hab.id}
                  id={hab.id}
                  nombre={hab.nombre}
                  imagen={
                    hab.imagenes?.find((img) => img.esPrincipal)?.url ||
                    hab.imagenes?.[0]?.url ||
                    ""
                  }
                  precio={hab.precioUnitario}
                  categoria={hab.categoria}
                  caracteristicas={hab.caracteristicas}
                />
              ))}
            </div>

            <div className="paginacion-container">
              <button
                disabled={paginaActual === 0}
                onClick={() => cargarHabitaciones(paginaActual - 1)}
              >
                Anterior
              </button>
              <span style={{ margin: "0 10px" }}>
                Página {paginaActual + 1} de {totalPaginas}
              </span>
              <button
                disabled={paginaActual + 1 === totalPaginas}
                onClick={() => cargarHabitaciones(paginaActual + 1)}
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>

      <div>
        <h2 className="section-title">Servicios incluidos</h2>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            padding: "10px 0",
          }}
        >
          {state.caracteristicas?.map((car) => (
            <div key={car.id} className="card servicio">
              <img
                src={car.icono}
                alt={car.nombre}
                className="card-img"
                style={{ width: "64px", height: "64px", margin: "auto" }}
              />
              <h3 className="card-title">{car.nombre}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
