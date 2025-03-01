import { useState } from "react";
import PropTypes from "prop-types";

const DynamicForm = ({ title, fields, onSubmit }) => {
  const initialState = fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyField = fields.find((field) => field.required && !formData[field.name]);

    if (emptyField) {
      setError(`❌ El campo "${emptyField.label}" es obligatorio.`);
      return;
    }

    onSubmit(formData, setFormData); 
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{title}</h3>

      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required}>
              <option value="">Selecciona una opción</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </div>
      ))}

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="save-btn">Enviar</button>
    </form>
  );
};

DynamicForm.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      options: PropTypes.array
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default DynamicForm;