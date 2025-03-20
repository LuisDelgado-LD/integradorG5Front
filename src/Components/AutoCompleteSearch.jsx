import { useState, useContext } from "react";
import Select from "react-select";
import { GlobalContext } from "../Context/utils/globalContext";

const AutocompleteSearch = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { state } = useContext(GlobalContext);

  const options = state.habitaciones.map((habitacion) => ({
    value: habitacion.id,
    label: habitacion.nombre,
  }));

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option); 
    }
  };

  return (
    <div style={styles.searchContainer}>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Busca una habitación..."
        isClearable
        noOptionsMessage={() => "No hay opciones disponibles"}
        styles={customStyles}
      />
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
};

const customStyles = {
  control: (base) => ({
    ...base,
    border: "2px solid #30384D",
    borderRadius: "6px",
    padding: "4px",
    fontSize: "16px",
    width: "100%",
    minWidth: "250px",
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
};

export default AutocompleteSearch;