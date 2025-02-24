import { useState, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Form = () => {
  const { dispatch } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    tipoProducto: "",
    nombre: "",
    descripcion: "",
    servicios: "",
    imagenPrincipal: null,
    imagenesIncluidas: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "imagenPrincipal") {
      setFormData({ ...formData, imagenPrincipal: e.target.files[0] });
    } else {
      setFormData({ ...formData, imagenesIncluidas: [...e.target.files] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.tipoProducto || !formData.descripcion || !formData.imagenPrincipal) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevaFecha = new Date().toLocaleString();
    dispatch({ type: "AGREGAR_PRODUCTO", payload: { ...formData, ultimaModificacion: nuevaFecha } });
    setFormData({ tipoProducto: "", nombre: "", descripcion: "", servicios: "", imagenPrincipal: null, imagenesIncluidas: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Nuevo Producto</h3>
      <label>Tipo de Producto</label>
      <input type="text" name="tipoProducto" value={formData.tipoProducto} onChange={handleChange} required />
      
      <label>Nombre</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
      
      <label>Descripción</label>
      <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
      
      <label>Servicios Incluidos</label>
      <input type="text" name="servicios" value={formData.servicios} onChange={handleChange} />
      
      <label>Agregar Imagen Principal</label>
      <input type="file" name="imagenPrincipal" accept="image/*" onChange={handleFileChange} required />
      
      <label>Agregar Imágenes Incluidas</label>
      <input type="file" name="imagenesIncluidas" multiple accept="image/*" onChange={handleFileChange} />
      
      <button type="submit" className="save-btn">Guardar</button>
    </form>
  );
};

export default Form;