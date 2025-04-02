import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const options = [
  { value: "chihuahua", label: "Chihuahua" },
  { value: "pomerania", label: "Pomerania" },
  { value: "yorkshire", label: "Yorkshire" },
  { value: "pinscher", label: "Pinscher" },
  { value: "beagle", label: "Beagle" },
  { value: "basenji", label: "Basenji" },
  { value: "cocker", label: "Cocker" },
  { value: "schnauzer", label: "Schnauzer" },
  { value: "whippet", label: "Whippet" },
  { value: "labrador", label: "Labrador" },
  { value: "maltes", label: "Maltés" },
  { value: "pequines", label: "Pekinés" },
  { value: "papillon", label: "Papillón" },
  { value: "shetland_sheepdog", label: "Shetland Sheepdog" },
  { value: "border_collie", label: "Border Collie" },
  { value: "shiba_inu", label: "Shiba Inu" },
  { value: "american_eskimo", label: "American Eskimo" },
  { value: "staffordshire_bull_terrier", label: "Staffordshire Bull Terrier" },
  { value: "pastor_aleman", label: "Pastor Alemán" },
  { value: "husky_siberiano", label: "Husky Siberiano" },
  { value: "shih_tzu", label: "Shih Tzu" },
  { value: "bichon_frise", label: "Bichón Frisé" },
  { value: "toy_poodle", label: "Toy Poodle" },
  { value: "bulldog_frances", label: "Bulldog Francés" },
  { value: "springer_spaniel", label: "Springer Spaniel" },
  { value: "corgi", label: "Corgi" },
  { value: "australian_shepherd", label: "Australian Shepherd" },
  { value: "samoyedo", label: "Samoyedo" },
  { value: "golden_retriever", label: "Golden Retriever" },
  { value: "rottweiler", label: "Rottweiler" }
];

const AutocompleteSearch = ({ onSelect }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { API_URL } = state;
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [habitaciones, setHabitaciones] = useState([]);

  const handleChange = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  const handleSearch = () => {
    if (selectedOption) {
      navigate(`/busqueda?nombre=${selectedOption.label}`);
    }
  };

  const obtenerHabitaciones = async () => {
    try {
        let todasLasHabitaciones = [];
        let pagina = 0;
        let totalPages = 1; // Inicializamos en 1 para entrar al bucle
    
        while (pagina < totalPages) {
          const response = await axios.get(`${API_URL}/habitaciones/all`, {
            params: { page: pagina, size: 10 }, // Aseguramos que se pagine correctamente
          });
    
          const { content, totalPages: nuevasTotalPages } = response.data;
          todasLasHabitaciones = [...todasLasHabitaciones, ...content];
          totalPages = nuevasTotalPages; // Actualizamos el número total de páginas
          pagina++; // Avanzamos a la siguiente página
        }
    
        // Transformamos los datos para que sean compatibles con react-select
        const habitacionesOptions = todasLasHabitaciones.map(habitacion => ({
          label: habitacion.nombre,
          value: habitacion.id,
        }));
    
        setHabitaciones(habitacionesOptions);
    } catch (error) {
      console.error('Error al obtener las habitaciones:', error);
    }
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  return (
    <div style={styles.searchContainer}>
      <Select
        options={habitaciones}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Busca una raza de perro..."
        isClearable
        noOptionsMessage={() => "No hay opciones disponibles"}
        styles={customStyles}
      />
      {(
        <button style={styles.searchButton} onClick={handleSearch}>
        Buscar
      </button>
      )}
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
    margin: "0 auto",
    flexWrap: "wrap",
  },
  searchButton: {
    backgroundColor: "#9195A1",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
  },
};

const customStyles = {
  control: (base) => ({
    ...base,
    border: "2px solid #30384D",
    borderRadius: "6px",
    padding: "4px",
    fontSize: "16px",
    transition: "all 0.3s ease-in-out",
    width: "100%", // Evita que el input se reduzca
    minWidth: "250px", // Establece un ancho mínimo
    "&:hover": { borderColor: "#41295E" },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "6px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    padding: "10px",
    fontSize: "16px",
    backgroundColor: isSelected ? "#5572BD" : isFocused ? "#4461AC" : "white",
    color: isSelected ? "white" : "black",
    cursor: "pointer",
  }),
  input: (base) => ({
    ...base,
    width: "100% !important", // Fuerza a que el input ocupe todo el espacio disponible
  }),
};

export default AutocompleteSearch;