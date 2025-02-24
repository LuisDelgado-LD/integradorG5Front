import { useContext, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import Form from "../Components/Form";

const Administrador = () => {
  const { state } = useContext(GlobalContext);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Gestión de Productos</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Producto</th>
            <th>Última Modificación</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {state.productos.length > 0 ? (
            state.productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.tipoProducto}</td>
                <td>{producto.ultimaModificacion}</td>
                <td>
                  <button onClick={() => eliminarProducto(producto.nombre)} className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay productos registrados</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="add-product-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        Añadir Producto
      </button>

      {mostrarFormulario && <Form />}
    </div>
  );
};

export default Administrador;