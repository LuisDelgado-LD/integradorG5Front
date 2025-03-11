import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const habitacionesPorPagina = 10;
  const [habitaciones, setHabitaciones] = useState([]);

  /*const URL_BACKEND = "https://petparadise.sytes.net/api/habitaciones";*/

  useEffect(() => {
    const mockHabitaciones = [
      // Pequeñas
      "Chihuahua", "Pomerania", "Yorkshire", "Pinscher", "Maltés", "Pekinés", "Papillón", "Shih Tzu", "Bichón Frisé", "Toy Poodle",
      // Medianas
      "Beagle", "Cocker", "Border Collie", "Bulldog Francés", "Schnauzer", "Staffordshire Bull Terrier", "Basenji", "Whippet", "Shetland Sheepdog", "American Eskimo",
      "Shiba Inu", "Corgi", "Springer Spaniel", "Australian Shepherd", "Samoyedo",
      // Grandes
      "Labrador", "Golden Retriever", "Pastor Alemán", "Husky Siberiano", "Rottweiler"
    ];

    const categorias = [
      { nombre: "Básico", tipo: "Pequeño", imagen: "/img/PalacioPeludo.png" },
      { nombre: "Premium", tipo: "Mediano", imagen: "/img/CuevaAcogedora.png" },
      { nombre: "VIP", tipo: "Grande", imagen: "/img/RefugioConfortable.png" },
    ];

    let todas = [];
    mockHabitaciones.forEach((nombre, i) => {
      let tipo = i < 10 ? "Pequeño" : i < 25 ? "Mediano" : "Grande";
      const categoria = categorias.find(c => c.tipo === tipo);
      todas.push({
        id: i + 1,
        nombre,
        imagen: categoria.imagen,
        ruta: "#",
        categoria: categoria.nombre
      });
    });

    setHabitaciones(todas);
  }, []);

  /*Conexion con el back */
  /*
  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const res = await fetch(URL_BACKEND);
        const data = await res.json();
        setHabitaciones(data);
      } catch (error) {
        console.error("❌ Error cargando habitaciones desde backend:", error);
      }
    };
    fetchHabitaciones();
  }, []);
  */
 
  const indiceUltima = paginaActual * habitacionesPorPagina;
  const indicePrimera = indiceUltima - habitacionesPorPagina;
  const habitacionesPagina = habitaciones.slice(indicePrimera, indiceUltima);
  const totalPaginas = Math.ceil(habitaciones.length / habitacionesPorPagina);

  return (
    <div className="home">
      <h2 className="section-title">Categoría</h2>
      <div className="card-grid">
        {["Básico", "Premium", "VIP"].map((categoria, index) => (
          <div key={index} className="card">
            <img src="patita.png" alt="icono" style={{ width: "50px" }} />
            <h3>{categoria}</h3>
          </div>
        ))}
      </div>

      <h2 className="section-title">Habitaciones</h2>
      <div className="card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {habitacionesPagina.map((habitacion) => (
          <Card key={habitacion.id} {...habitacion} />
        ))}
      </div>

      <div className="paginacion-container">
        <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button key={index} onClick={() => setPaginaActual(index + 1)} className={paginaActual === index + 1 ? "activo" : ""}>{index + 1}</button>
        ))}
        <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
      </div>

      <h2 className="section-title">Servicios Incluidos</h2>
      <div className="card-grid">
        {state.privilegiosAlojamientos.map((servicio) => (
          <Card key={servicio.id} {...servicio} />
        ))}
      </div>

    </div>
  );
};

export default Home;