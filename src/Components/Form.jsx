import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Form = () => {
  const [formData, setFormData] = useState({
    nombreDuenio: "", apellidoDuenio: "", email: "", telefono: "", direccion: "", contrasena: "",
    nombreMascota: "", raza: "", tamano: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombreDuenio || !formData.apellidoDuenio || !formData.email ||
        !formData.telefono || !formData.direccion || !formData.contrasena ||
        !formData.nombreMascota || !formData.raza || !formData.tamano) {
      setError("Todos los campos son obligatorios");
    } else {
      alert(`Registro exitoso de ${formData.nombreMascota}, dueño: ${formData.nombreDuenio} ${formData.apellidoDuenio}`);
      setError("");
   
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Información del Dueño</h2>
      <input type="text" name="nombreDuenio" placeholder="Nombre" value={formData.nombreDuenio} onChange={handleChange} required />
      <input type="text" name="apellidoDuenio" placeholder="Apellido" value={formData.apellidoDuenio} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
      <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
      <input type="password" name="contrasena" placeholder="Contraseña" value={formData.contrasena} onChange={handleChange} required />
      <h2>Información de la Mascota</h2>
      <input type="text" name="nombreMascota" placeholder="Nombre de la mascota" value={formData.nombreMascota} onChange={handleChange} required />
      <input type="text" name="raza" placeholder="Raza" value={formData.raza} onChange={handleChange} required />
      <select name="tamano" value={formData.tamano} onChange={handleChange} required>
        <option value="">Selecciona el tamaño</option>
        <option value="grande">Grande</option>
        <option value="mediano">Mediano</option>
        <option value="pequeño">Pequeño</option>
      </select>
      <button type="submit">Registrar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Form;