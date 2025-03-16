import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Card from "../Components/Card";

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

  useEffect(() => {
    const pequenas = [
      "Chihuahua", "Pomerania", "Yorkshire", "Pinscher", "Maltés",
      "Pekinés", "Papillón", "Shih Tzu", "Bichón Frisé", "Toy Poodle"
    ];
    const medianas = [
      "Beagle", "Cocker", "Border Collie", "Bulldog Francés", "Schnauzer",
      "Staffordshire Bull Terrier", "Basenji", "Whippet", "Shetland Sheepdog",
      "American Eskimo", "Shiba Inu", "Corgi", "Springer Spaniel", "Australian Shepherd", "Samoyedo"
    ];
    const grandes = [
      "Labrador", "Golden Retriever", "Pastor Alemán", "Husky Siberiano", "Rottweiler"
    ];

    let todas = [];

    pequenas.forEach((nombre, i) => {
      todas.push({
        id: i + 1,
        nombre,
        imagen: "/img/PalacioPeludo.png",
        descripcion: "Espacio acogedor ideal para razas pequeñas.",
        categoria: "Básico",
        tipo: "Pequeña"
      });
    });

    medianas.forEach((nombre, i) => {
      todas.push({
        id: i + 11,
        nombre,
        imagen: "/img/RefugioConfortable.png",
        descripcion: "Ideal para razas medianas con energía y curiosidad.",
        categoria: "Premium",
        tipo: "Mediana"
      });
    });

    grandes.forEach((nombre, i) => {
      todas.push({
        id: i + 26,
        nombre,
        imagen: "/img/CuevaAcogedora.png",
        descripcion: "Amplio y cómodo para razas grandes.",
        categoria: "VIP",
        tipo: "Grande"
      });
    });

    localStorage.setItem("habitacionesMock", JSON.stringify(todas));
    setHabitaciones(mezclar(todas));
    dispatch({ type: "SET_HABITACIONES", payload: todas });
  }, []);

  const totalPaginas = Math.ceil(habitaciones.length / habitacionesPorPagina);
  const inicio = (paginaActual - 1) * habitacionesPorPagina;
  const habitacionesPagina = habitaciones.slice(inicio, inicio + habitacionesPorPagina);
  const servicios = state.privilegiosAlojamientos || [];
  const categorias = [
    { nombre: "Básico", icono: "/img/1patita.png" },
    { nombre: "Premium", icono: "/img/2patitas.png" },
    { nombre: "VIP", icono: "/img/3patitas.png" },
  ];

  return (
    <div className="home">

      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Categoría</h2>
        <div className="card-grid">
          {categorias.map((cat, idx) => (
            <div key={idx} className="card categoria">
              <img src={cat.icono} alt={cat.nombre} className="card-img" />
              <h3 className="card-title">{cat.nombre}</h3>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "3cm" }}>
        <h2 className="section-title">Habitaciones</h2>
        <div className="card-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
          {habitacionesPagina.map((habitacion) => (
            <Card key={habitacion.id} {...habitacion} />
          ))}
        </div>

        <div className="paginacion-container">
          <button disabled={paginaActual === 1} onClick={() => setPaginaActual(paginaActual - 1)}>Anterior</button>
          <span style={{ margin: "0 10px" }}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(paginaActual + 1)}>Siguiente</button>
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