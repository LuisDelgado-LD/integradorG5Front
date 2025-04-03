// import { useLocation } from "react-router-dom";
// import React, { useState, forwardRef  } from "react";
// import DatePicker, {registerLocale} from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import es from "date-fns/locale/es"; // Importa el locale español
// import AutocompleteSearch from "../Components/AutoCompleteSearch"; 


// const Navbar = () => {
//   registerLocale("es", es);
//   const location = useLocation();
//   if (location.pathname !== "/") return null;

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);

//   const onChangeStart = (date) => {
//     // const [start, end] = dates;
//     setStartDate(date);
//     setEndDate(null);
//   };
//   const onChangeEnd = (dates) => {
//     const [start, end] = dates;
//     // setStartDate(start);
//     setEndDate(end);
//   };

//   return (
//     <nav className="navbar">
//       <p className="navbar-text">Escoge la Fecha para tu peludito</p>

//       <div className="date-picker-container">
//         <div className="date-picker">
//           <label className="date-label">Fecha de ingreso</label>
//           <div className="calendar-box">
//           <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
//             {/* <DatePicker
//               dateFormat="dd/MM/yyyy"
//               //excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
//               minDate={new Date()}
//               locale={es}
//               selected={startDate}
//               onChange={onChangeStart}
//               Date={startDate}
//               startDate={startDate}
//               endDate={endDate}
//               selectsRange
//             /> */}
//             <DatePicker 
//               withPortal
//               minDate={new Date()}
//               dateFormat="dd/MM/yyyy"
//               selected={startDate} 
//               locale={es}
//               onChange={onChangeStart}
//               />
//           </div>
//         </div>
//         <div className="date-picker">
//           <label className="date-label">Fecha salida</label>
//           <div className="calendar-box">
//           <img src="/img/Calendario.png" alt="Calendario ingreso" className="calendar-icon" />
//             <DatePicker
//               withPortal
//               dateFormat="dd/MM/yyyy"
//               locale={es}
//               minDate={startDate}
//               selected={endDate}
//               onChange={onChangeEnd}
//               startDate={startDate}
//               endDate={endDate}
//               selectsRange
//             />
//           </div>
//         </div>
//       </div>

//       <AutocompleteSearch onSelect={setSelectedBreed} />
//     </nav>
//   );
// };

// export default Navbar;

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import AutocompleteSearch from "../Components/AutoCompleteSearch";
import { GlobalContext } from "../Context/utils/globalContext";
import reservasService from "../services/ReservasService";

registerLocale("es", es);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);
  const usuario = state.usuario;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  const [fechasOcupadas, setFechasOcupadas] = useState({});

  const cargarFechasOcupadas = async () => {
    const nuevas = {};
    for (const h of state.habitaciones) {
      try {
        const res = await reservasService.getByHabitacion(h.id);
        nuevas[h.id] = res.data.flatMap((r) => {
          const fi = new Date(r.fechaInicio);
          const ff = new Date(r.fechaFin);
          const fechas = [];
          while (fi <= ff) {
            fechas.push(new Date(fi.toDateString()));
            fi.setDate(fi.getDate() + 1);
          }
          return fechas;
        });
      } catch {
        nuevas[h.id] = [];
      }
    }
    setFechasOcupadas(nuevas);
  };

  const esDisponible = (id, start, end) => {
    const ocupadas = fechasOcupadas[id] || [];
    const inicio = new Date(start);
    const fin = new Date(end);

    return !ocupadas.some((f) => {
      const ocupada = new Date(f);
      return ocupada >= inicio && ocupada <= fin;
    });
  };

  const buscarDisponibilidad = async () => {
    setResultado(null);
    setHabitacionesDisponibles([]);
    await cargarFechasOcupadas();

    const inicio = startDate ? new Date(startDate) : null;
    const fin = endDate ? new Date(endDate) : null;

    if (selectedBreed && !inicio && !fin) {
      const ocupadas = fechasOcupadas[selectedBreed.value] || [];
      setResultado(ocupadas.length
        ? `❌ La habitación ${selectedBreed.label} tiene fechas reservadas.`
        : `✅ La habitación ${selectedBreed.label} está disponible en general.`);
      return;
    }

    if (!selectedBreed && inicio && fin) {
      const disponibles = state.habitaciones.filter(h => esDisponible(h.id, inicio, fin));

      if (disponibles.length) {
        setResultado("✅ Habitaciones disponibles:");
        setHabitacionesDisponibles(disponibles);
      } else {
        setResultado("❌ No hay habitaciones disponibles en estas fechas.");
      }
      return;
    }

    if (selectedBreed && inicio && fin) {
      if (esDisponible(selectedBreed.value, inicio, fin)) {
        setResultado(`✅ ¡La habitación ${selectedBreed.label} está disponible!`);
        dispatch({
          type: "SET_RESERVA",
          payload: {
            habitacionId: selectedBreed.value,
            habitacionNombre: selectedBreed.label,
            fechaInicio: startDate.toISOString(),
            fechaFin: endDate.toISOString(),
          },
        });
      } else {
        setResultado(`❌ La habitación ${selectedBreed.label} no está disponible en esas fechas.`);
      }
      return;
    }

    setResultado("❌ Por favor selecciona al menos una habitación o un rango de fechas.");
  };

  const reservar = () => {
    if (!usuario) {
      navigate("/login", { state: { mensaje: "Debes iniciar sesión para reservar." } });
      return;
    }
    navigate(`/reserva/${selectedBreed?.value}`);
  };

  if (location.pathname !== "/") return null;

  return (
    <nav className="navbar">
      <p className="navbar-text">Escoge la Fecha para tu peludito</p>

      <div className="date-picker-container">
        <DatePicker
          withPortal minDate={new Date()} dateFormat="dd/MM/yyyy" locale={es}
          selected={startDate} onChange={date => { setStartDate(date); setEndDate(null); }}
          placeholderText="Fecha de ingreso"
        />
        <DatePicker
          withPortal minDate={startDate} dateFormat="dd/MM/yyyy" locale={es}
          selected={endDate} onChange={setEndDate} placeholderText="Fecha de salida"
        />
      </div>

      <AutocompleteSearch onSelect={setSelectedBreed} />

      <button onClick={buscarDisponibilidad} style={styles.botonBuscar}>
        Buscar Disponibilidad
      </button>

      {resultado && <p style={{ marginTop: "10px", color: resultado.includes("✅") ? "green" : "red" }}>{resultado}</p>}

      {habitacionesDisponibles.length > 0 && (
        <div style={styles.sidebar}>
          {habitacionesDisponibles.map(h => (
            <div key={h.id} style={styles.card} onClick={() => navigate(`/habitacion/${h.id}`)}>
              <img src="/img/iconoPatita.png" alt="patita" style={styles.cardImg} />
              <h3 style={styles.cardTitle}>{h.nombre}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedBreed && resultado?.includes("✅") && (
        <button onClick={reservar} style={styles.botonReserva}>
          Reservar ahora
        </button>
      )}
    </nav>
  );
};

const styles = {
  botonBuscar: {
    marginTop: "10px", backgroundColor: "#30384D", color: "#fff",
    padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer"
  },
  botonReserva: {
    marginTop: "10px", backgroundColor: "#28a745", color: "#fff",
    padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer"
  },
  sidebar: {
    maxHeight: "400px", overflowY: "auto", padding: "10px",
    border: "1px solid #ccc", borderRadius: "10px", marginTop: "20px",
    width: "250px", marginLeft: "auto", marginRight: "auto",
    backgroundColor: "#f8f8f8", boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  card: {
    display: "flex", flexDirection: "column", alignItems: "center",
    cursor: "pointer", marginBottom: "15px", padding: "10px",
    borderRadius: "8px", backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", transition: "transform 0.2s"
  },
  cardImg: { width: "50px", height: "50px", marginBottom: "10px" },
  cardTitle: { fontSize: "16px", color: "#30384D", textAlign: "center" }
};

export default Navbar;
