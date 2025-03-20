import { useState, useEffect } from "react";

const GestionMaestro = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formData, setFormData] = useState({ id: null, nombre: "", tipo: "", descripcion: "" });
  const [maestros, setMaestros] = useState(() => {
    const guardados = localStorage.getItem("maestros");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("maestros", JSON.stringify(maestros));
  }, [maestros]);

  const abrirCrear = () => {
    setModoEdicion(false);
    setFormData({ id: null, nombre: "", tipo: "", descripcion: "" });
    setModalOpen(true);
  };

  const abrirEditar = (maestro) => {
    setModoEdicion(true);
    setFormData(maestro);
    setModalOpen(true);
  };

  const eliminarMaestro = (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este maestro?");
    if (confirmar) {
      const actualizados = maestros.filter((m) => m.id !== id);
      setMaestros(actualizados);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.tipo || !formData.descripcion) {
      alert("❗Completa todos los campos.");
      return;
    }

    let nuevos;
    if (modoEdicion) {
      nuevos = maestros.map((m) => (m.id === formData.id ? formData : m));
    } else {
      nuevos = [...maestros, { ...formData, id: Date.now() }];
    }

    setMaestros(nuevos);
    setModalOpen(false);
  };

  return (
    <div className="gestion-maestro-page">
      <div className="container-gestion">
        <h2 className="titulo-gestion">Gestión de Maestro</h2>

        <table className="tabla-maestros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo de Maestro</th>
              <th>Última Modificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {maestros.map((m) => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                <td>{m.tipo}</td>
                <td>{new Date().toLocaleDateString()}</td>
                <td className="acciones">
                  <span className="icono" onClick={() => abrirEditar(m)}>🖊️</span>
                  <span className="icono" onClick={() => eliminarMaestro(m.id)}>🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boton-aniadir-container">
        <button className="btn-aniadir" onClick={abrirCrear}>
          ➕ Añadir Maestro
        </button>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="cerrar-modal" onClick={() => setModalOpen(false)}>×</span>
            <h3>{modoEdicion ? "Editar Maestro" : "Registrar Maestro"}</h3>
            <form onSubmit={handleGuardar}>
              <select name="tipo" value={formData.tipo} onChange={handleChange} required>
                <option value="">Selecciona tipo</option>
                <option value="Categoría">Categoría</option>
                <option value="Producto">Producto</option>
              </select>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre del maestro"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <textarea
                name="descripcion"
                placeholder="Añade la descripción del maestro"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />

              {formData.tipo === "Producto" && (
                <button type="button" className="btn-agregar-imagenes">
                  Agregar Imágenes Incluidas
                </button>
              )}

              <button type="submit" className="btn-guardar">Guardar</button>
            </form>
          </div>
        </div>
      )}

      <div className="imagen-pie">
        <img src="/img/imagendepie.png" alt="Imagen Pie" />
      </div>
    </div>
  );
};

export default GestionMaestro;