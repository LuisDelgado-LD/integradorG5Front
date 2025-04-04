import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import SoloEscritorio from "../Components/SoloEscritorio";
import habitacionesService from "../services/HabitacionesService";
import api from "../services/Api";

const GestionHabitaciones = () => {
  const { state } = useContext(GlobalContext);
  const token = state.token;

  const [datos, setDatos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ visible: false, item: null });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    tipoMaestro: "Categoría",
    nombre: "",
    descripcion: "",
    tipo: "",
    precioUnitario: "",
    categoriaId: "",
    tamano: "",
    isDisponible: true,
    patitas: 1,
    imagenPrincipal: null,
    imagenesSecundarias: [],
  });

  const fetchTodo = async () => {
    try {
      const categoriasRes = await habitacionesService.getCategorias();
      const categorias = categoriasRes.data.map((c) => ({
        ...c,
        tipoMaestro: "Categoría",
      }));
  
      let todasLasHabitaciones = [];
      let page = 0;
      let totalPages = 1;
  
      do {
        const res = await habitacionesService.getByPage(page);
        const pageHabitaciones = res.content || [];
        todasLasHabitaciones = [...todasLasHabitaciones, ...pageHabitaciones];
        totalPages = res.totalPages;
        page++;
      } while (page < totalPages);
  
      const habitacionesFormatted = todasLasHabitaciones.map((h) => ({
        ...h,
        tipoMaestro: "Habitación",
      }));
  
      setDatos([...categorias, ...habitacionesFormatted]);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };
  

  useEffect(() => {
    fetchTodo();
  }, []);

  const abrirCrear = () => {
    setModoEdicion(false);
    setFormData({
      id: null,
      tipoMaestro: "Categoría",
      nombre: "",
      descripcion: "",
      tipo: "",
      precioUnitario: "",
      categoriaId: "",
      tamano: "",
      isDisponible: true,
      patitas: 1,
      imagenPrincipal: null,
      imagenesSecundarias: [],
    });
    setErrorMensaje("");
    setModalOpen(true);
  };

  const abrirEditar = (item) => {
    setModoEdicion(true);
    setFormData({
      id: item.id,
      tipoMaestro: item.tipoMaestro,
      nombre: item.nombre,
      descripcion: item.descripcion,
      tipo: item.tipo || "",
      precioUnitario: item.precioUnitario || "",
      categoriaId: item.categoria?.id || "",
      tamano: item.tamano || "",
      isDisponible: item.isDisponible ?? true,
      patitas: item.patitas || 1,
      imagenPrincipal: null,
      imagenesSecundarias: [],
    });
    setErrorMensaje("");
    setModalOpen(true);
  };

  const solicitarEliminacion = (item) => {
    setConfirmModal({ visible: true, item });
  };

  const confirmarEliminacion = async () => {
    const { item } = confirmModal;
    try {
      if (item.tipoMaestro === "Habitación") {
        await habitacionesService.delete(item.id);
      } else {
        await habitacionesService.deleteCategoria(item.id);
      }
      setConfirmModal({ visible: false, item: null });
      fetchTodo();
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar el registro");
    }
  };

  const cancelarEliminacion = () => {
    setConfirmModal({ visible: false, item: null });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagenPrincipal: e.target.files[0] }));
  };

  const handleMultipleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imagenesSecundarias: Array.from(e.target.files) }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    setErrorMensaje("");

    try {
      if (formData.tipoMaestro === "Categoría") {
        const categoriaBody = {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          patitas: parseInt(formData.patitas),
          imagenUrl: formData.imagenPrincipal ? `/img/${formData.imagenPrincipal.name}` : "",
        };

        if (modoEdicion) {
          await api.put(`/categorias/${formData.id}`, categoriaBody);
        } else {
          await api.post("/categorias", categoriaBody);
        }

        if (formData.imagenPrincipal) {
          localStorage.setItem(
            `cat-img-${categoriaBody.nombre}`,
            URL.createObjectURL(formData.imagenPrincipal)
          );
        }

        setModalOpen(false);
        fetchTodo();
        return;
      }

      const habitacionBody = {
        nombre: formData.nombre,
        tipo: formData.tipo,
        descripcion: formData.descripcion,
        precioUnitario: parseFloat(formData.precioUnitario),
        categoria: { id: parseInt(formData.categoriaId) },
        tamano: formData.tamano,
        isDisponible: formData.isDisponible,
      };

      if (modoEdicion) {
        await habitacionesService.update(formData.id, habitacionBody);
      } else {
        await habitacionesService.create(habitacionBody);
      }

      if (formData.imagenPrincipal) {
        localStorage.setItem(
          `habitacion-img-${formData.nombre}`,
          URL.createObjectURL(formData.imagenPrincipal)
        );
      }

      setModalOpen(false);
      fetchTodo();
    } catch (err) {
      console.error("Error al guardar:", err);
      setErrorMensaje("Error al guardar: revisa los campos o intenta más tarde.");
    }
  };

  const datosFiltrados = datos.filter((item) =>
    filtroTipo === "Todos" ? true : item.tipoMaestro === filtroTipo
  );

  return (
    <SoloEscritorio>
      <div className="gestion-maestro-page">
        <div className="container-gestion">
          <h2 className="titulo-gestion">Gestión de Habitaciones y Categorías</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label>Filtrar por tipo:&nbsp;</label>
            <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="Todos">Todos</option>
              <option value="Categoría">Categoría</option>
              <option value="Habitación">Habitación</option>
            </select>
          </div>

          <table className="tabla-maestros">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((item) => (
                <tr key={`${item.tipoMaestro}-${item.id}`}>
                  <td>{item.nombre}</td>
                  <td>{item.tipoMaestro}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <span className="icono" onClick={() => abrirEditar(item)}>🖊️</span>
                    <span className="icono" onClick={() => solicitarEliminacion(item)}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="boton-aniadir-container">
            <button className="btn-aniadir" onClick={abrirCrear}>Añadir</button>
          </div>

          {confirmModal.visible && (
            <div className="modal-overlay">
              <div className="modal center-modal">
                <p>¿Seguro que deseas eliminar <strong>{confirmModal.item?.nombre}</strong>?</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
                  <button className="btn-guardar" onClick={confirmarEliminacion}>Eliminar</button>
                  <button className="btn-cancelar" onClick={cancelarEliminacion}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {modalOpen && (
            <div className="modal-overlay">
              <div className="modal" style={{ maxHeight: "90vh", overflowY: "auto" }}>
                <h3>{modoEdicion ? "Editar" : `Nueva ${formData.tipoMaestro}`}</h3>
                <form onSubmit={handleGuardar}>
                  {errorMensaje && <p className="error-text">{errorMensaje}</p>}
                  <select name="tipoMaestro" value={formData.tipoMaestro} onChange={handleChange}>
                    <option value="Categoría">Categoría</option>
                    <option value="Habitación">Habitación</option>
                  </select>
                  <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                  <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
                  {formData.tipoMaestro === "Categoría" ? (
                    <>
                      <input type="number" name="patitas" min="1" max="5" value={formData.patitas} onChange={handleChange} required />
                      <label>Imagen:</label>
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                    </>
                  ) : (
                    <>
                      <input type="text" name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleChange} required />
                      <input type="number" name="precioUnitario" placeholder="Precio Unitario" value={formData.precioUnitario} onChange={handleChange} required />
                      <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
                        <option value="">Selecciona categoría</option>
                        <option value="1">Básico</option>
                        <option value="2">Premium</option>
                        <option value="3">VIP</option>
                      </select>
                      <select name="tamano" value={formData.tamano} onChange={handleChange} required>
                        <option value="">Selecciona tamaño</option>
                        <option value="PEQUENA">Pequeña</option>
                        <option value="MEDIANA">Mediana</option>
                        <option value="GRANDE">Grande</option>
                      </select>
                      <label>
                        Disponible:
                        <input type="checkbox" name="isDisponible" checked={formData.isDisponible} onChange={handleChange} />
                      </label>
                      <label>Imagen principal:</label>
                      <input type="file" accept="image/*" onChange={handleFileChange} />
                      <label>Imágenes secundarias:</label>
                      <input type="file" multiple accept="image/*" onChange={handleMultipleFileChange} />
                    </>
                  )}
                  <button type="submit" className="btn-guardar">Guardar</button>
                  <button type="button" className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </SoloEscritorio>
  );
};

export default GestionHabitaciones;
