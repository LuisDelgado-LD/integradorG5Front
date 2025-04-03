import React from "react";
import Select from "react-select";

const ImageOption = ({ data }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img src={data.url} alt={`Imagen ${data.id}`} style={{ width: "40px", height: "auto", marginRight: "8px" }} />
    <span>{`ID: ${data.id}`}</span>
  </div>
);

const ImageSelect = ({ options, value, onChange }) => {
  // Define las opciones para react-select
  const formattedOptions = options.map((img) => ({
    value: img.id,
    label: <ImageOption data={img} />,
    url: img.url,
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  return (
    <Select
      options={formattedOptions}
      value={formattedOptions.find((opt) => opt.value === value) || null}
      onChange={(selected) => onChange(selected)}
      styles={customStyles}
      placeholder="Seleccione una imagen"
      isSearchable
    />
  );
};

export default ImageSelect;
