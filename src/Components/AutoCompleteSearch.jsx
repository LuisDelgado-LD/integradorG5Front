import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "chihuahua", label: "Chihuahua" },
  { value: "poodle", label: "Poodle" },
  { value: "bulldog", label: "Bulldog" },
  { value: "golden", label: "Golden Retriever" },
];

const AutocompleteSearch = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div style={styles.searchContainer}>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Busca una raza de perro..."
        isClearable
        noOptionsMessage={() => "No hay opciones disponibles"}
        styles={customStyles}
      />
      {selectedOption && (
        <button style={styles.searchButton}>Buscar</button>
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
      backgroundColor: isSelected ? "#3372BD" : isFocused ? "#2261AC" : "white",
      color: isSelected ? "white" : "black",
      cursor: "pointer",
    }),
    input: (base) => ({
      ...base,
      width: "100% !important", // Fuerza a que el input ocupe todo el espacio disponible
    }),
  };

export default AutocompleteSearch;
