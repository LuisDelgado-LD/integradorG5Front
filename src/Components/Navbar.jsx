import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import Autosuggest from "react-autosuggest";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

const razas = [
  "Chihuahua", "Pomerania", "Yorkshire", "Labrador", "Golden Retriever", "Corgi", "Beagle",
  "Pug", "Boxer", "Pastor Alemán", "Dálmata", "Bóxer", "Caniche", "Bulldog", "Husky"
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nombre, setNombre] = useState("");
  const [sugerencias, setSugerencias] = useState([]);

  if (location.pathname !== "/") return null;

  const getSugerencias = (value) => {
    const input = value.trim().toLowerCase();
    return razas.filter(r =>
      r.toLowerCase().includes(input)
    );
  };

  const handleBuscar = () => {
    if (!startDate && !endDate && !nombre) {
      alert("Selecciona al menos una fecha o nombre de habitación");
      return;
    }

    if ((startDate && !endDate) || (!startDate && endDate)) {
      alert("Debes seleccionar tanto la fecha de ingreso como la de salida");
      return;
    }

    const query = new URLSearchParams();
    if (nombre) query.set("nombre", nombre);
    if (startDate) query.set("entrada", startDate.toISOString().split("T")[0]);
    if (endDate) query.set("salida", endDate.toISOString().split("T")[0]);

    navigate(`/busqueda?${query.toString()}`);
  };

  return (
    <nav className="navbar" style={{ background: "#D9D9D9", padding: "10px 40px" }}>
      <span style={{ fontSize: "14px", color: "#616676", fontWeight: 600, marginRight: "10px" }}>
        Filtros para tu peludito
      </span>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label style={labelStyle}>Fecha ingreso</label>
          <DatePicker
            locale="es"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setEndDate(null);
            }}
            placeholderText="Fecha ingreso"
            className="calendar-box"
          />
        </div>

        <div>
          <label style={labelStyle}>Fecha salida</label>
          <DatePicker
            locale="es"
            dateFormat="dd/MM/yyyy"
            minDate={startDate}
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="Fecha salida"
            className="calendar-box"
          />
        </div>

        <div>
          <label style={labelStyle}>Nombre de habitación</label>
          <Autosuggest
            suggestions={sugerencias}
            onSuggestionsFetchRequested={({ value }) =>
              setSugerencias(getSugerencias(value))
            }
            onSuggestionsClearRequested={() => setSugerencias([])}
            getSuggestionValue={(s) => s}
            onSuggestionSelected={(e, { suggestionValue }) => setNombre(suggestionValue)}
            renderSuggestion={(s) => <span>{s}</span>}
            inputProps={{
              placeholder: "Nombre habitación...",
              value: nombre,
              onChange: (_, { newValue }) => setNombre(newValue),
              className: "calendar-box"
            }}
            theme={{
              container: { width: 200 },
              suggestionsContainer: { background: "white", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", zIndex: 10 },
              suggestion: { padding: "10px", cursor: "pointer" },
              suggestionHighlighted: { backgroundColor: "#e0e0e0" }
            }}
          />
        </div>

        <button className="search-button" onClick={handleBuscar}>
           Buscar
        </button>
      </div>
    </nav>
  );
};

const labelStyle = {
  fontSize: "12px",
  color: "#616676",
  fontWeight: 500,
  marginBottom: "2px",
  display: "block"
};

export default Navbar;
