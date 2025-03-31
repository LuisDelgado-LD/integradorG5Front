import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const iconoPatita = "/img/iconoPatita.png";
const iconosCategoria = { Básico: 1, Premium: 2, VIP: 3 };

const descripcionesCategoria = {
  Básico: "Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza...",
  Premium: "Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio...",
  VIP: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos...",
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
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;
  const [habitacion, setHabitacion] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  useEffect(() => {
    const encontrada = state.habitaciones.find((h) => h.id === parseInt(id));
    setHabitacion(encontrada);

    setFechasOcupadas([
      new Date("2025-03-22"),
      new Date("2025-03-23"),
      new Date("2025-03-24"),
    ]);

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setEsFavorito(favoritos.includes(parseInt(id)));
  }, [id, state.habitaciones]);

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const idHabitacion = parseInt(id);
    const nuevosFavoritos = favoritos.includes(idHabitacion)
      ? favoritos.filter((favId) => favId !== idHabitacion)
      : [...favoritos, idHabitacion];

    setEsFavorito(!esFavorito);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  const reservar = () => {
    if (!usuario) {
      navigate("/login", { state: { mensaje: "Debes iniciar sesión para reservar." } });
      return;
    }

    if (!fechaInicio || !fechaFin) {
      alert("❌ Debes seleccionar una fecha válida.");
      return;
    }

    dispatch({
      type: "SET_RESERVA",
      payload: {
        habitacionId: habitacion.id,
        habitacionNombre: habitacion.nombre,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
      },
    });

    navigate(`/reserva/${habitacion.id}`);
  };

  if (!habitacion) return <p>Cargando habitación...</p>;

  return (
    <div className="habitacion-container-Principal" style={{ padding: "20px" }}>
      <div className="Encabezado">
        <h2>{habitacion.nombre}</h2>
        <button className="back-home" onClick={() => navigate("/")}>
          <img src="/img/flecha.png" alt="Volver" />
        </button>
      </div>
      <div className="habitacion-container">
        <div className="habitacion-img-container">
          <img className="habitacion-img" src={habitacion.imagen} alt={habitacion.nombre} style={{ width: "100%" }} />
        </div>
        
        <div className="habitacion-content">
          <p><strong>Categoría:</strong> {habitacion.categoria}</p>
          <p><strong>Descripción:</strong> {descripcionesCategoria[habitacion.categoria]}</p>
        </div>
      </div>
      <button className="ver-mas" onClick={() => navigate(`/galeria/${habitacion.id}`)}>Ver más</button>

      <div className="habitacion-container2">
        <p><strong>Características:</strong></p>
        <ul>
          {caracteristicasPorCategoria[habitacion.categoria].map((car, index) => (
            <li key={index}>
              <img src={iconosCaracteristicas[car]} alt={car} width="24" /> {car}
            </li>
          ))}
        </ul>

        <p><strong>Selecciona tu rango de fechas:</strong></p>
        <DatePicker selected={fechaInicio} onChange={setFechaInicio} placeholderText="Fecha de inicio" />
        <DatePicker selected={fechaFin} onChange={setFechaFin} placeholderText="Fecha de fin" />
      </div>
      <button onClick={reservar} disabled={!fechaInicio || !fechaFin} style={{ backgroundColor: "#30384D", color: "white" }}>
          Reservar ahora
        </button>
    </div>
  );
};

export default Habitaciones;