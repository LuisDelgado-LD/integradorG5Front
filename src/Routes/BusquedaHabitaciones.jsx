import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import habitacionesService from "../services/HabitacionesService";

const ITEMS_POR_PAGINA = 20;

const BusquedaHabitaciones = () => {
  const [searchParams] = useSearchParams();
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    const nombre = searchParams.get("nombre");
    const entrada = searchParams.get("entrada");
    const salida = searchParams.get("salida");

    const buscar = async () => {
      setLoading(true);
      try {
        let res;
        if (nombre && nombre !== "" && entrada && salida) {
          res = await habitacionesService.buscarPorNombreYFechas(nombre, entrada, salida);
        } else if (nombre && nombre !== "") {
          res = await habitacionesService.buscarPorNombre(nombre);
        } else if (entrada && salida) {
          res = await habitacionesService.buscarPorFechas(entrada, salida);
        }

        if (res?.data) {
          setHabitaciones(res.data);
          setPaginaActual(1);
        }
      } catch (err) {
        console.error("Error al buscar habitaciones", err);
      } finally {
        setLoading(false);
      }
    };

    buscar();
  }, [searchParams]);

  const totalPaginas = Math.ceil(habitaciones.length / ITEMS_POR_PAGINA);
  const habitacionesMostradas = habitaciones.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const renderCategoriaConPatitas = (categoria) => {
    const patitas = {
      "Básica": 1,
      "Premium": 2,
      "VIP": 3
    }[categoria] || 0;

    return (
      <>
        {Array.from({ length: patitas }).map((_, i) => (
          <img key={i} src="/img/patita.png" alt="patita" style={{ width: 18, marginRight: 4 }} />
        ))}
        <span>{categoria}</span>
      </>
    );
  };

  return (
    <div className="admin-container">
    <h2 className="titulo-busqueda">Resultados de búsqueda</h2>

      {loading ? (
        <p>Cargando habitaciones...</p>
      ) : habitaciones.length === 0 ? (
        <p>No se encontraron habitaciones.</p>
      ) : (
        <>
          <ul className="lista-habitaciones">
            {habitacionesMostradas.map(h => (
              <li
                key={h.id}
                className="item-habitacion"
                onClick={() => window.location.href = `/habitacion/${h.id}`}
              >
                <img
                  src={h.imagenes?.find(img => img.esPrincipal)?.url || "/img/default.png"}
                  className="img-habitacion"
                  alt={h.nombre}
                />
                <div className="info-habitacion">
                  <h3>{h.nombre}</h3>
                  <p className="habitacion-precio">Precio: ${h.precioUnitario || 'Consultar'}</p>
                  <p className="habitacion-descripcion">{h.descripcion || 'Sin descripción'}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="paginacion-container">
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
              ⬅️ Anterior
            </button>
            <span style={{ margin: "0 10px" }}>
              Página {paginaActual} de {totalPaginas}
            </span>
            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
              Siguiente ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BusquedaHabitaciones;
