import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";
import axios from "axios";

const mezclar = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [habitaciones, setHabitaciones] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const habitacionesPorPagina = 10;
  const { categorias } = state;
  const { API_URL } = state;
  const {totalHabitaciones} = state;
  const totalPaginas = Math.ceil(totalHabitaciones / habitacionesPorPagina);
  const servicios = state.privilegiosAlojamientos || [];
  const consultaBack = (pagina) => {
    setPaginaActual(pagina);
    const pageApi = pagina-1;
      axios.get(`${API_URL}/habitaciones/all?page=${pageApi}&size=${habitacionesPorPagina}`)
      .then(response =>{
        console.log("habitaciones:", response.data.totalElements);
        console.log("habitaciones:", response.data.content);
        dispatch({ type: "SET_TOTAL_HABITACIONES", payload: response.data.totalElements });
        const habitacionesCache = response.data.content.map(element => ({
          id: element.id,
          nombre: element.nombre,
          imagen: "/img/PalacioPeludo.png",
          descripcion: element.descripcion,
          categoria: element.categoria.nombre,
          tipo: element.tamano
        }));
        setHabitaciones(mezclar(habitacionesCache));
        dispatch({ type: "SET_HABITACIONES", payload: habitacionesCache });
  
      })
  }
  useEffect(() => { // obtener categorias y habitaciones
    consultaBack(paginaActual);
    axios.get(API_URL + "/categorias")
    .then(response =>{
      console.log(response.data);
      dispatch({ type: "SET_CATEGORIAS", payload: response.data });
    })
    .catch(error =>{
      console.log(error)
    })
  }, []);
  
  // const cambiarPagina = (pagina) => {
  //   setPaginaActual(pagina);
  // };
  // const handleCambiarPagina = (nuevaPagina) => {
  //     .then(response => {
  //       dispatch({ type: "SET_TOTAL_HABITACIONES", payload: response.data.totalElements });
  //       const habitacionesCache = response.data.content.map(element => ({
  //         id: element.id,
  //         nombre: element.nombre,
  //         imagen: "/img/PalacioPeludo.png",
  //         descripcion: element.descripcion,
  //         categoria: element.categoria.nombre,
  //         tipo: element.tamano
  //       }));
  //       setHabitaciones(mezclar(habitacionesCache));
  //       dispatch({ type: "SET_HABITACIONES", payload: habitacionesCache });
  //       setPaginaActual(nuevaPagina);
  //     })
  //     .catch(error => console.log(error));
  // console.log(habitaciones)
  // };

  return (
    <div className="home">

      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Categoría</h2>
        <div className="card-grid">
          {categorias.map((cat, idx) => (
            <div key={idx} className="card categoria">
              <img src={cat.imagenUrl} alt={cat.nombre} className="card-img" />
              <h3 className="card-title">{cat.nombre}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Habitaciones</h2>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {habitaciones.map((habitacion) => (
            <Card key={habitacion.id} {...habitacion} />
          ))}
        </div>

        <div className="paginacion-container">
          <button disabled={paginaActual === 1} onClick={() => consultaBack(paginaActual - 1)}>Anterior</button>
          {/* <button disabled={paginaActual === 1} onClick={cambiarPagina(paginaActual - 1)}>Anterior</button> */}
          <span style={{ margin: "0 10px" }}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button disabled={paginaActual === totalPaginas} onClick={() => consultaBack(paginaActual + 1)}>Siguiente</button>
          {/* <button disabled={paginaActual === 1} onClick={cambiarPagina(paginaActual + 1)}>Siguiente</button> */}
        </div>
      </div>

      <div>
        <h2 className="section-title">Servicios incluidos</h2>
        <div style={{
          display: "flex",
          overflowX: "auto",
          gap: "20px",
          padding: "10px 0"
        }}>
          {servicios.map((servicio) => (
            <Card key={servicio.id} {...servicio} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;