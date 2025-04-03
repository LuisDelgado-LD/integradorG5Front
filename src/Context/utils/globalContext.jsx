import { createContext, useReducer } from "react";

const initialState = {
  usuario: null,
  token: null,
  habitaciones: [],
  caracteristicas: [],
  reserva: null,
  categorias: ["Básica", "Premium", "VIP"],
  tamanos: ["Pequeño", "Mediano", "Grande"],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        usuario: action.payload.usuario,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        usuario: null,
        token: null,
      };

    case "SET_HABITACIONES":
      return {
        ...state,
        habitaciones: action.payload,
      };

    case "SET_CARACTERISTICAS":
      return {
        ...state,
        caracteristicas: action.payload,
      };

    case "SET_RESERVA":
      return {
        ...state,
        reserva: action.payload,
      };

    default:
      return state;
  }
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
