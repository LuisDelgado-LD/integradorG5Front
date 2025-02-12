import { useEffect, useState } from "react";
import { getProductos } from "../services/productoService";

const Productos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>{producto.nombre} - ${producto.precioUnitario}</li>
        ))}
      </ul>
    </div>
  );
};

export default Productos;