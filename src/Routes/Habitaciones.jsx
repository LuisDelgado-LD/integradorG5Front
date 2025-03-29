import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import axios from "axios";

const iconoPatita = "/img/iconoPatita.png";
const iconosCategoria = {
  Básico: 1,
  Premium: 2,
  VIP: 3,
};

const descripcionesCategoria = {
  Básico:
    "Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza. Con zonas para descansar, jugar y explorar, el Palacio Peludo ofrece una comodidad total, con camas extra grandes, alfombras suaves y un ambiente relajante. Perfecto para aquellas mascotas que disfrutan de su espacio y buscan sentirse como verdaderos reyes.",
  Premium:
    "Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio entre amplitud y comodidad. El Refugio Confortable tiene todo lo necesario para que tu mascota se sienta segura y feliz. Con un diseño práctico, camas cómodas y rincones para la privacidad, es el lugar perfecto para descansar después de un día lleno de aventuras.",
  VIP:
    "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda, una atmósfera cálida y una decoración que invita al descanso. Ideal para mascotas más reservadas que buscan un refugio especial donde se sientan protegidos y en paz.",
};

const caracteristicasPorCategoria = {
  Básico: ["estadia", "alimentacion", "paseos"],
  Premium: ["estadia", "alimentacion", "paseos", "peluqueria"],
  VIP: ["estadia", "alimentacion", "paseos", "peluqueria", "entrenamiento"],
};

const iconosCaracteristicas = {
  estadia: "/img/estadia.png",
  alimentacion: "/img/alimentacion.png",
  paseos: "/img/paseos.png",
  peluqueria: "/img/peluqueria.png",
  entrenamiento: "/img/entrenamiento.png",
};

const Habitaciones = () => {
  console.log("Montando habitaciones")
  const { state } = useContext(GlobalContext);
  const { API_URL } = state;
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

//   useEffect(() => {
//     const encontrada = state.habitaciones.find((h) => h.id === parseInt(id));
//     setHabitacion(encontrada);
//   }, [id, state.habitaciones]);

//   if (!habitacion) return <p>Cargando habitación...</p>;

//   const categoria = habitacion.categoria;
//   const descripcion = descripcionesCategoria[categoria];
//   const caracteristicas = caracteristicasPorCategoria[categoria] || [];
  console.log("API_URL:", API_URL);
  console.log("id:", id);
  const fetchData = async () => {
    try {
      console.log(`Llamada API: ${API_URL}/habitaciones/${id}`);
      const habitacionResponse = await axios.get(`${API_URL}/habitaciones/${id}`);
      console.log(habitacionResponse)
      const habitacion = {
            id: habitacionResponse.data.id,
            nombre: habitacionResponse.data.nombre,
            imagen: habitacionResponse.data.imagenes.length === 0 ? "/img/PalacioPeludo.png" : habitacionResponse.data.imagenes[0].url,
            descripcion: habitacionResponse.data.descripcion,
            categoria: habitacionResponse.data.categoria.nombre,
            categoriaId: habitacionResponse.data.categoria.id,
            caracteristicas: habitacionResponse.data.caracteristicas, // posiblemente haya que mapear
            tipo: habitacionResponse.data.tamano,
            
          };
          setHabitacion(habitacion);
          console.log(`variable local ${JSON.stringify(habitacion, null, 2)}`);
      setHabitacion(habitacion); // Asignar el primer elemento

      console.log(`Llamada API: ${API_URL}/categorias/${habitacion.categoriaId}`);
      const categoriaResponse = await axios.get(`${API_URL}/categorias/${habitacion.categoriaId}`);
      console.log("Respuesta categoria:", categoriaResponse)
      const categoria = {
        nombre: categoriaResponse.data.nombre,
        icono: "/img/iconoPatita.png", // categoriaResponse.imagenUrl,
        cantidad: categoriaResponse.data.patitas,
      };
      setCategoria(categoria); // Asignar el primer elemento
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  
  useEffect(() => {
    fetchData();
}, []);

// variables usadas
//{habitacion.imagen} alt={habitacion.nombre}
//habitacion.id
//iconosCategoria
//iconoPatita
//{descripcion}
// caracteristicas.map((car, idx) => (
//   <div key={idx} >
//     <img src={iconosCaracteristicas[car]} alt={car} width="32" />
//     <span style={{ fontWeight: 500 }}>{car.charAt(0).toUpperCase() + car.slice(1)}</span>
  if (loading) return <p>Cargando habitación...</p>; // Mostrar mensaje de carga

  if (!habitacion || !categoria) return <p>No se encontraron datos.</p>; // Validar datos

  return (
    <div className="habitacion-container" style={{ padding: "20px" }}>
      <div className="Auxiliares-detalle">
        <h2>{habitacion.nombre}</h2>
        <button className="back-home" onClick={() => navigate("/")}>
          <img src="/img/flecha.png" alt="Volver" />
        </button>
      </div>
      <div className="Contenido-Container">
        <div
          className="habitacion-img-container"
          style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <img className="habitacion-img" src={habitacion.imagen} alt={habitacion.nombre} />
          <button
            className="ver-mas"
            onClick={() => navigate(`/galeria/${habitacion.id}`)}
            style={{ marginTop: "1cm" }}
          >
            Ver más
          </button>
        </div>
        <div style={{ marginTop: "1cm", textAlign: "left" }}>
          <p className="habitacion-categoria">
            <strong>Categoría:</strong> {categoria.nombre}
            {/* {Array.from({ length: iconosCategoria[categoria] || 0 }).map((_, i) => ( */}
            {Array.from({ length: categoria.cantidad }).map((_, i) => (
              <img
                key={i}
                src={categoria.icono}
                alt="Patita"
                style={{ width: "20px", marginLeft: "5px" }}
              />
            ))}
          </p>
          <p className="habitacion-title" style={{ marginTop: "1cm" }}>
            <strong>Descripción:</strong> {habitacion.descripcion}
          </p>
        </div>
        <div style={{ marginTop: "1cm", textAlign: "left" }}>
          <p><strong>Características:</strong></p>
          <div style={{ display: "flex", gap: "1cm", flexWrap: "wrap" }}>
            {/* {caracteristicas.map((car, idx) => ( */}
            {habitacion.caracteristicas.map((element, id) => (
              <div key={id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={element.iconoUrl} alt={element.nombre} width="32" />
                {/* <span style={{ fontWeight: 500 }}>{element.charAt(0).toUpperCase() + element.slice(1)}</span> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habitaciones;