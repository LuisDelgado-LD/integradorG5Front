import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Form from "../Components/Form";

const Administrador = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const verificarDispositivo = () => {
      setEsMovil(window.innerWidth <= 768);
    };
    verificarDispositivo();
    window.addEventListener("resize", verificarDispositivo);
    return () => window.removeEventListener("resize", verificarDispositivo);
  }, []);

  const eliminarProducto = (nombre) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      dispatch({ type: "ELIMINAR_PRODUCTO", payload: nombre });
    }
  };

  if (esMovil) {
    return <p>Acceso restringido en dispositivos móviles.</p>;
  }

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Productos</h2>
      <button className="add-product-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        Añadir Producto
      </button>
      {mostrarFormulario && <Form />}
      <h3>Lista de productos</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {state.productos.length > 0 ? (
            state.productos.map((producto, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto.nombre)} className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay productos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Administrador;