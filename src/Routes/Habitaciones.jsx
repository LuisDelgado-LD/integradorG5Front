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
  const { state } = useContext(GlobalContext);
  const [habitacion, setHabitacion] = useState(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  useEffect(() => {
    const encontrada = state.habitaciones.find((h) => h.id === parseInt(id));
    setHabitacion(encontrada);

    const ocupadas = [
      new Date("2025-03-22"),
      new Date("2025-03-23"),
      new Date("2025-03-24"),
    ];
    setFechasOcupadas(ocupadas);

    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setEsFavorito(favoritos.includes(parseInt(id)));
  }, [id, state.habitaciones]);

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const idHabitacion = parseInt(id);
    let nuevosFavoritos;

    if (favoritos.includes(idHabitacion)) {
      nuevosFavoritos = favoritos.filter((favId) => favId !== idHabitacion);
      setEsFavorito(false);
    } else {
      nuevosFavoritos = [...favoritos, idHabitacion];
      setEsFavorito(true);
    }

    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  const rangoValido = () => {
    if (!fechaInicio || !fechaFin) return false;
    let current = new Date(fechaInicio);
    while (current <= fechaFin) {
      const ocupado = fechasOcupadas.some(
        (fecha) => fecha.toDateString() === current.toDateString()
      );
      if (ocupado) return false;
      current.setDate(current.getDate() + 1);
    }
    return true;
  };

  const reservar = () => {
    if (!rangoValido()) {
      alert("❌ Las fechas seleccionadas no están disponibles.");
      return;
    }
    alert(`✅ Reserva confirmada del ${fechaInicio.toLocaleDateString()} al ${fechaFin.toLocaleDateString()}`);
  };

  if (!habitacion) return <p>Cargando habitación...</p>;

  const categoria = habitacion.categoria;
  const descripcion = descripcionesCategoria[categoria];
  const caracteristicas = caracteristicasPorCategoria[categoria] || [];

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
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              className="habitacion-img"
              src={habitacion.imagen}
              alt={habitacion.nombre}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <img
              src={esFavorito ? "/img/corazon_lleno.png" : "/img/corazon_vacio.png"}
              alt="Favorito"
              onClick={toggleFavorito}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            />
          </div>

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
            <strong>Categoría:</strong> {categoria}
            {Array.from({ length: iconosCategoria[categoria] || 0 }).map((_, i) => (
              <img
                key={i}
                src={iconoPatita}
                alt="Patita"
                style={{ width: "20px", marginLeft: "5px" }}
              />
            ))}
          </p>

          <p className="habitacion-title" style={{ marginTop: "1cm" }}>
            <strong>Descripción:</strong> {descripcion}
          </p>

          {/* DISPONIBILIDAD Y RESERVA - debajo de descripción, 5mm */}
          <div style={{ marginTop: "5mm" }}>
            <p><strong>Disponibilidad:</strong> Esta habitación no está disponible en las fechas marcadas.</p>

            <div style={{ display: "flex", gap: "20px", alignItems: "center", marginTop: "10px" }}>
              <div>
                <label><strong>Desde:</strong></label><br />
                <DatePicker
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                  selectsStart
                  startDate={fechaInicio}
                  endDate={fechaFin}
                  excludeDates={fechasOcupadas}
                  placeholderText="Selecciona fecha de inicio"
                />
              </div>

              <div>
                <label><strong>Hasta:</strong></label><br />
                <DatePicker
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  selectsEnd
                  startDate={fechaInicio}
                  endDate={fechaFin}
                  minDate={fechaInicio}
                  excludeDates={fechasOcupadas}
                  placeholderText="Selecciona fecha de fin"
                />
              </div>
            </div>

            <button
              onClick={reservar}
              disabled={!fechaInicio || !fechaFin}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#30384D",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Reservar
            </button>
          </div>
        </div>

        {/* CARACTERÍSTICAS - al final */}
        <div style={{ marginTop: "1cm", textAlign: "left" }}>
          <p><strong>Características:</strong></p>
          <div style={{ display: "flex", gap: "1cm", flexWrap: "wrap" }}>
            {caracteristicas.map((car, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={iconosCaracteristicas[car]} alt={car} width="32" />
                <span style={{ fontWeight: 500 }}>
                  {car.charAt(0).toUpperCase() + car.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habitaciones;