import { createContext, useReducer, /*useEffect*/ } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

/*const API_URL = "http://petparadise.sytes.net/api";*/

const MOCK_USER = {
  usuario: {
    nombre: "Mileidy",
    apellido: "Dávila",
    email: "mileidy93davila@gmail.com",
    telefono: "3214568978",
    direccion: "Calle 10",
  },
  token: "mocked_token",
};

const initialState = {
  usuario: JSON.parse(localStorage.getItem("usuario")) || MOCK_USER.usuario,
  token: localStorage.getItem("token") || MOCK_USER.token,
  habitaciones: [
    { id: 1, nombre: "Palacio Peludo", imagen: "/img/PalacioPeludo.png", ruta: "/PalacioPeludo", descripcion: "Un espacio amplio y lujoso diseñado para brindar a tu mascota una experiencia de realeza. Con zonas para descansar, jugar y explorar, el Palacio Peludo ofrece una comodidad total, con camas extra grandes, alfombras suaves y un ambiente relajante." },
    { id: 2, nombre: "Refugio Confortable", imagen: "/img/RefugioConfortable.png", ruta: "/RefugioConfortable", descripcion: "Un lugar acogedor y lleno de calidez, ideal para aquellos que buscan el equilibrio entre amplitud y comodidad. El Refugio Confortable tiene todo lo necesario para que tu mascota se sienta segura y feliz." },
    { id: 3, nombre: "Cueva Acogedora", imagen: "/img/CuevaAcogedora.png", ruta: "/CuevaAcogedora", descripcion: "Un pequeño paraíso para mascotas que prefieren espacios íntimos y tranquilos. La Cueva Acogedora es perfecta para dormir plácidamente, con una cama cómoda y una atmósfera cálida." },
  ],
  privilegiosAlojamientos: [
    { id: 1, nombre: "Masajes Relajantes", imagen: "/img/MasajesRelajantes.png", ruta: "/CuevaAcogedora", descripcion: "Sesión de relajación para reducir el estrés y mejorar la circulación de tu mascota." },
    { id: 2, nombre: "Peluquería y Estilismo", imagen: "/img/PeluqueríaYEstilismo.png", ruta: "/CuevaAcogedora", descripcion: "Corte y baño especializado para mantener a tu mascota limpia y con estilo." },
    { id: 3, nombre: "Entrenamiento Personalizado", imagen: "/img/EntrenamientoPersonalizado.png", ruta: "/CuevaAcogedora", descripcion: "Clases de obediencia y trucos adaptadas a cada mascota." },
    { id: 4, nombre: "Paseos Guiados", imagen: "/img/PaseosGuiados.png", ruta: "/CuevaAcogedora", descripcion: "Exploraciones dirigidas para que tu mascota disfrute de un paseo seguro y divertido." },
    { id: 5, nombre: "Veterinario", imagen: "/img/Psicologo.png", ruta: "/CuevaAcogedora", descripcion: "Atención médica para garantizar la salud de tu mascota durante su estadía." },
  ],
  productos: [],
  categorias: ["Básica", "Premium", "VIP"],
  tamanos: ["Grande", "Mediano", "Pequeño"],
  maestros: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
      return { ...state, usuario: action.payload.usuario, token: action.payload.token };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      return { ...state, usuario: null, token: null };

    case "SET_HABITACIONES":
      return { ...state, habitaciones: action.payload };

    case "SET_PRIVILEGIOS":
      return { ...state, privilegiosAlojamientos: action.payload };

    case "SET_PRODUCTOS":
      return { ...state, productos: action.payload };

    case "SET_CATEGORIAS":
      return { ...state, categorias: action.payload };

    case "SET_MAESTROS":
      return { ...state, maestros: action.payload };

    case "AGREGAR_MAESTRO":
      return { ...state, maestros: [...state.maestros, action.payload] };

    case "EDITAR_MAESTRO":
      return {
        ...state,
        maestros: state.maestros.map((m) =>
          m.id === action.payload.id ? action.payload : m
        ),
      };

    case "ELIMINAR_MAESTRO":
      return { ...state, maestros: state.maestros.filter((m) => m.id !== action.payload) };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*
  useEffect(() => {
    const validarToken = async () => {
      if (!state.token) return;
      try {
        const response = await fetch(`${API_URL}/auth/validate`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.token}`
          }
        });

        if (!response.ok) {
          dispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("❌ Error validando el token:", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    validarToken();
  }, [state.token]);
  */

  /*
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const responseMaestros = await fetch(`${API_URL}/maestros`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        if (!responseMaestros.ok) throw new Error("Error cargando maestros");
        const dataMaestros = await responseMaestros.json();
        dispatch({ type: "SET_MAESTROS", payload: dataMaestros });

      } catch (error) {
        console.error("❌ Error obteniendo datos del backend:", error);
      }
    };

    if (state.token) {
      cargarDatos();
    }
  }, [state.token]);
  */

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
