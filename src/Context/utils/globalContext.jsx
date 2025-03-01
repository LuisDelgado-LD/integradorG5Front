import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

const initialState = {
  habitaciones: [
    { id: 1, nombre: "Palacio Peludo", imagen: "/img/PalacioPeludo.png", ruta: "/PalacioPeludo", descripcion: "Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza. Con zonas para descansar, jugar y explorar, el Palacio Peludo ofrece una comodidad total, con camas extra grandes, alfombras suaves y un ambiente relajante." },
    { id: 2, nombre: "Refugio Confortable", imagen: "/img/RefugioConfortable.png", ruta: "/RefugioConfortable", descripcion: "Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio entre amplitud y comodidad. El Refugio Confortable tiene todo lo necesario para que tu mascota se sienta segura y feliz." },
    { id: 3, nombre: "Cueva Acogedora", imagen: "/img/CuevaAcogedora.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 4, nombre: "Masajes Relajantes", imagen: "/img/MasajesRelajantes.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 5, nombre: "Peluquería y Estilismo", imagen: "/img/PeluqueríaYEstilismo.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 6, nombre: "Entrenamiento Personalizado", imagen: "/img/EntrenamientoPersonalizado.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 7, nombre: "Paseos Guiados", imagen: "/img/PaseosGuiados.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 8, nombre: "Psicólogo", imagen: "/img/Psicologo.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 9, nombre: "Psicólogo", imagen: "/img/Psicologo.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
    { id: 10, nombre: "Psicólogo", imagen: "/img/Psicologo.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
  ],
  productos: [],
  categorias: ["Básica", "Premium", "VIP"],
  tamanos: ["Grande", "Mediano", "Pequeño"] 
};

const reducer = (state, action) => {
  switch (action.type) {
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
    fetch("http://localhost:5173/api/productos")
      .then(response => response.json())
      .then(data => dispatch({ type: "SET_PRODUCTOS", payload: data }))
      .catch(error => console.error("Error obteniendo productos:", error));

    /*fetch("https://petparadise.sytes.net/api/all")
      .then(response => response.json())
      .then(data => dispatch({ type: "SET_HABITACIONES", payload: data.content }))
      .catch(error => console.error("Error obteniendo habitaciones:", error));*/
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
