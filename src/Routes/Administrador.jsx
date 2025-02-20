import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const Administrador = () => {
  const navigate = useNavigate();
  const { state } = useContext(GlobalContext);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Bienvenido, Administrador</h2>
      <button className="add-product-btn" onClick={() => navigate("/agregar-producto")}>
        Añadir Producto
      </button>
      <img src="/img/Group8.png" alt="Admin Icon" className="admin-img" />
      
      <div className="product-list">
        <h3>Lista de Productos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {state.productos.map((producto, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>
                  <button className="delete-btn">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Administrador;