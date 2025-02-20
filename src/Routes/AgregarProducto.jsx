import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const AgregarProducto = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagenes: [],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagenes: [...e.target.files] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.descripcion || formData.imagenes.length === 0) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (state.productos.some((prod) => prod.nombre === formData.nombre)) {
      setError("El nombre del producto ya existe.");
      return;
    }

    dispatch({ type: "AGREGAR_PRODUCTO", payload: formData });
    navigate("/administrador");
  };

  return (
    <div className="agregar-producto-container">
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="form-producto">
        <input type="text" name="nombre" placeholder="Nombre del producto" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción del producto" onChange={handleChange} required />
        <input type="file" multiple onChange={handleFileChange} required />
        <button type="submit">Guardar Producto</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AgregarProducto;