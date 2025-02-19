import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const initialState = {
  mascotas: [],
  habitaciones: [
    {
      id: 1,
      nombre: "Palacio Peludo",
      imagen: "/img/PalacioPeludo.png",
      ruta: "/PalacioPeludo"
    },
    {
      id: 2,
      nombre: "Refugio Confortable",
      imagen: "/img/RefugioConfortable.png",
      ruta: "/RefugioConfortable"
    },
    {
      id: 3,
      nombre: "Cueva Acogedora",
      imagen: "/img/CuevaAcogedora.png",
      ruta: "/CuevaAcogedora"
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MASCOTAS":
      return { ...state, mascotas: action.payload };
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