import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const initialState = {
  mascotas: [],
  habitaciones: [
    { id: 1, nombre: "Palacio Peludo", imagen: "/img/PalacioPeludo.png", ruta: "/PalacioPeludo" },
    { id: 2, nombre: "Refugio Confortable", imagen: "/img/RefugioConfortable.png", ruta: "/RefugioConfortable" },
    { id: 3, nombre: "Cueva Acogedora", imagen: "/img/CuevaAcogedora.png", ruta: "/CuevaAcogedora" }
  ],
  servicios: [
    { id: 1, nombre: "Masajes Relajantes", imagen: "/img/MasajesRelajantes.png" },
    { id: 2, nombre: "Peluquería y Estilismo", imagen: "/img/PeluqueríaYEstilismo.png" },
    { id: 3, nombre: "Entrenamiento Personalizado", imagen: "/img/EntrenamientoPersonalizado.png" },
    { id: 4, nombre: "Paseos Guiados", imagen: "/img/PaseosGuiados.png" }
  ],
  productos: [] 
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MASCOTAS":
      return { ...state, mascotas: action.payload };

    case "SET_PRODUCTOS":
      return { ...state, productos: action.payload };

    case "AGREGAR_PRODUCTO":
      return { ...state, productos: [...state.productos, action.payload] };

    case "ELIMINAR_PRODUCTO":
      return { ...state, productos: state.productos.filter(prod => prod.nombre !== action.payload) };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8080/api/mascotas")
      .then(response => response.json())
      .then(data => dispatch({ type: "SET_MASCOTAS", payload: data }))
      .catch(error => console.error("Error obteniendo mascotas:", error));

    fetch("http://localhost:8080/api/productos")
      .then(response => response.json())
      .then(data => dispatch({ type: "SET_PRODUCTOS", payload: data }))
      .catch(error => console.error("Error obteniendo productos:", error));
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};