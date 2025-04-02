import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AutocompleteSearch = ({ onSelect }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { API_URL } = state;
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [habitaciones, setHabitaciones] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const obtenerHabitaciones = async () => {
      try {
        let todasLasHabitaciones = [];
        let pagina = 0;
        let totalPages = 1;
        while (pagina < totalPages) {
          const response = await axios.get(`${API_URL}/habitaciones/all`, {
            params: { page: pagina, size: 10 }
          });
          const { content, totalPages: nuevasTotalPages } = response.data;
          todasLasHabitaciones = [...todasLasHabitaciones, ...content];
          totalPages = nuevasTotalPages;
          pagina++;
        }
        setHabitaciones(todasLasHabitaciones.map(habitacion => ({
          label: habitacion.nombre,
          value: habitacion.id,
        })));
      } catch (error) {
        console.error('Error al obtener las habitaciones:', error);
      }
    };
    obtenerHabitaciones();
  }, [API_URL]);

  useEffect(() => {
    if (query.trim() !== '') {
      setFilteredOptions(habitaciones.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase())
      ));
      setShowSuggestions(true);
    } else {
      setFilteredOptions([]);
      setShowSuggestions(false);
    }
  }, [query, habitaciones]);

  const handleSearch = () => {
    if (onSelect  && query) {
      onSelect({ label: query, value: null });
      navigate(`/busqueda?nombre=${query}`);
    }else{
      alert("Debe buscar por nombre o por fecha.")
    }
  };

  const handleSuggestionClick = (option) => {
    setQuery(option.label);
    setShowSuggestions(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div style={styles.searchContainer}>
      <div style={{ position: 'relative', width: '100%'}}>
        <input 
          type="text" 
          style={styles.input} 
          placeholder="Busca una habitación..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          onFocus={() => query && setShowSuggestions(true)}
        />
        {showSuggestions && filteredOptions.length > 0 && (
          <ul className="autocomplete-suggestions">
            {filteredOptions.map((option, index) => (
              <li 
                key={index} 
                className="suggestion-item"
                onClick={() => handleSuggestionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button style={styles.searchButton} onClick={handleSearch}>Buscar🔍</button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    width: "80%",
    padding: "10px",
    border: "2px solid #30384D",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  },
  searchButton: {
    width: "150px",
    backgroundColor: "#5572BD",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
  },
  suggestionsList: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    listStyle: "none",
    padding: 0,
    margin: "4px 0 0 0",
    zIndex: 1000,
  },
  suggestionItem: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default AutocompleteSearch;