import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const initialState = {
  mascotas: [],
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
    axios.get("http://localhost:8080/api/mascotas")
      .then(response => dispatch({ type: "SET_MASCOTAS", payload: response.data }))
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