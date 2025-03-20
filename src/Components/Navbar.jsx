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
import AutocompleteSearch from "../Components/AutocompleteSearch";
import { GlobalContext } from "../Context/utils/globalContext";

registerLocale("es", es);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [puedeReservar, setPuedeReservar] = useState(false);
  const [habitacionesDisponibles, setHabitacionesDisponibles] = useState([]);

  if (location.pathname !== "/") return null;

  const fechasOcupadas = {
    1: ["2025-03-25", "2025-03-26"],
    2: ["2025-03-21", "2025-03-22"],
    3: ["2025-03-24"],
  };

  const esDisponible = (id, start, end) => {
    const ocupadas = fechasOcupadas[id] || [];
    const inicio = new Date(start);
    const fin = new Date(end);

    for (let f of ocupadas) {
      const ocupada = new Date(f);
      if (ocupada >= inicio && ocupada <= fin) {
        return false;
      }
    }
    return true;
  };

  const buscarDisponibilidad = () => {
    setLoading(true);
    setResultado(null);
    setPuedeReservar(false);
    setHabitacionesDisponibles([]);

    setTimeout(() => {
      const inicio = startDate ? new Date(startDate) : null;
      const fin = endDate ? new Date(endDate) : null;

      if (selectedBreed && !inicio && !fin) {
        const ocupadas = fechasOcupadas[selectedBreed.value] || [];

        if (ocupadas.length === 0) {
          setResultado(`✅ La habitación ${selectedBreed.label} está disponible en general.`);
        } else {
          setResultado(`❌ La habitación ${selectedBreed.label} tiene fechas ya reservadas.`);
        }

        setLoading(false);
        return;
      }

      if (!selectedBreed && inicio && fin) {
        const disponibles = state.habitaciones.filter((habitacion) =>
          esDisponible(habitacion.id, inicio, fin)
        );

        if (disponibles.length > 0) {
          setResultado("✅ Habitaciones disponibles:");
          setHabitacionesDisponibles(disponibles);
        } else {
          setResultado("❌ No hay habitaciones disponibles en estas fechas.");
        }

        setLoading(false);
        return;
      }

      if (selectedBreed && inicio && fin) {
        const disponible = esDisponible(selectedBreed.value, inicio, fin);

        if (disponible) {
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
          setPuedeReservar(true);
        } else {
          setResultado(`❌ La habitación ${selectedBreed.label} no está disponible en esas fechas.`);
        }

        setLoading(false);
        return;
      }

      setResultado("❌ Por favor selecciona al menos una habitación o un rango de fechas.");
      setLoading(false);
    }, 1000);
  };

  const irADetalle = (id) => {
    navigate(`/habitacion/${id}`);
  };

  return (
    <nav className="navbar">
      <p className="navbar-text">Escoge la Fecha para tu peludito</p>

      <div className="date-picker-container">
        <div className="date-picker">
          <label className="date-label">Fecha de ingreso</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Ingreso" className="calendar-icon" />
            <DatePicker
              withPortal
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              locale={es}
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(null);
              }}
            />
          </div>
        </div>

        <div className="date-picker">
          <label className="date-label">Fecha de salida</label>
          <div className="calendar-box">
            <img src="/img/Calendario.png" alt="Salida" className="calendar-icon" />
            <DatePicker
              withPortal
              dateFormat="dd/MM/yyyy"
              locale={es}
              minDate={startDate}
              selected={endDate}
              onChange={setEndDate}
            />
          </div>
        </div>
      </div>

      <AutocompleteSearch onSelect={setSelectedBreed} />

      <button onClick={buscarDisponibilidad} style={styles.botonBuscar}>
        Buscar Disponibilidad
      </button>

      {loading && <p style={{ marginTop: "10px" }}>🔍 Buscando disponibilidad...</p>}

      {!loading && resultado && (
        <pre style={{ marginTop: "10px", fontWeight: "bold", whiteSpace: "pre-wrap", color: resultado.includes("✅") ? "green" : "red" }}>
          {resultado}
        </pre>
      )}

      {puedeReservar && (
        <button
          onClick={() => alert("🎉 Reserva guardada. Puedes continuar luego o ir a detalles.")}
          style={styles.botonReserva}
        >
          Guardar Reserva
        </button>
      )}

      {habitacionesDisponibles.length > 0 && (
        <div style={styles.sidebar}>
          {habitacionesDisponibles.map((h) => (
            <div key={h.id} style={styles.card} onClick={() => irADetalle(h.id)}>
              <img src="/img/iconoPatita.png" alt="patita" style={styles.cardImg} />
              <h3 style={styles.cardTitle}>{h.nombre}</h3>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

const styles = {
  botonBuscar: {
    marginTop: "10px",
    backgroundColor: "#30384D",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  botonReserva: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  sidebar: {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "20px",
    width: "250px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  cardImg: {
    width: "50px",
    height: "50px",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "16px",
    color: "#30384D",
    textAlign: "center",
  },
};

export default Navbar;