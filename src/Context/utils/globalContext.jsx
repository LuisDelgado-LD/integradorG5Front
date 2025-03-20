import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();


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

//Habitaciones mockeadas
const generarHabitacionesMock = () => {
  const pequenas = [
    "Chihuahua", "Pomerania", "Yorkshire", "Pinscher", "Maltés",
    "Pekinés", "Papillón", "Shih Tzu", "Bichón Frisé", "Toy Poodle"
  ];
  const medianas = [
    "Beagle", "Cocker", "Border Collie", "Bulldog Francés", "Schnauzer",
    "Staffordshire Bull Terrier", "Basenji", "Whippet", "Shetland Sheepdog",
    "American Eskimo"
  ];
  const grandes = [
    "Labrador", "Golden Retriever", "Pastor Alemán", "Husky Siberiano", "Rottweiler", "Shiba Inu", "Corgi", "Springer Spaniel", "Australian Shepherd", "Samoyedo"
  ];

  let todas = [];

  pequenas.forEach((nombre, i) => {
    todas.push({
      id: i + 1,
      nombre,
      imagen: "/img/PalacioPeludo.png",
      descripcion: "Espacio acogedor ideal para razas pequeñas.",
      categoria: "Básico",
      tipo: "Pequeña"
    });
  });

  medianas.forEach((nombre, i) => {
    todas.push({
      id: i + 11,
      nombre,
      imagen: "/img/RefugioConfortable.png",
      descripcion: "Ideal para razas medianas con energía y curiosidad.",
      categoria: "Premium",
      tipo: "Mediana"
    });
  });

  grandes.forEach((nombre, i) => {
    todas.push({
      id: i + 26,
      nombre,
      imagen: "/img/CuevaAcogedora.png",
      descripcion: "Amplio y cómodo para razas grandes.",
      categoria: "VIP",
      tipo: "Grande"
    });
  });

  return todas;
};

const initialState = {
  // usuario: JSON.parse(localStorage.getItem("usuario")) || MOCK_USER.usuario,
  // token: localStorage.getItem("token") || MOCK_USER.token,
  API_URL: "http://localhost:8080/api",
  //  habitaciones: generarHabitacionesMock(),
  habitaciones: [],
  privilegiosAlojamientos: [
    { id: 1, nombre: "Masajes Relajantes", imagen: "/img/MasajesRelajantes.png", ruta: "/CuevaAcogedora", descripcion: "Sesión de relajación para reducir el estrés y mejorar la circulación de tu mascota." },
    { id: 2, nombre: "Peluquería y Estilismo", imagen: "/img/PeluqueríaYEstilismo.png", ruta: "/CuevaAcogedora", descripcion: "Corte y baño especializado para mantener a tu mascota limpia y con estilo." },
    { id: 3, nombre: "Entrenamiento Personalizado", imagen: "/img/EntrenamientoPersonalizado.png", ruta: "/CuevaAcogedora", descripcion: "Clases de obediencia y trucos adaptadas a cada mascota." },
    { id: 4, nombre: "Paseos Guiados", imagen: "/img/PaseosGuiados.png", ruta: "/CuevaAcogedora", descripcion: "Exploraciones dirigidas para que tu mascota disfrute de un paseo seguro y divertido." },
    { id: 5, nombre: "Servicio Veterinario", imagen: "/img/Psicologo.png", ruta: "/CuevaAcogedora", descripcion: "Atención médica para garantizar la salud de tu mascota durante su estadía." },
  ],
  productos: [],
  categorias: [],
  caracteristicas: [],
  tamanos: ["Grande", "Mediano", "Pequeño"],
  maestros: [],
  totalHabitaciones: 0,
  categoria: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("usuario", JSON.stringify(action.payload.usuario));
      return { ...state, usuario: action.payload.usuario, token: action.payload.token };

    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      return { ...state, usuario: null, token: null };

    case "SET_TOTAL_HABITACIONES":
      return { ...state, totalHabitaciones: action.payload };

    case "SET_HABITACIONES":
      return { ...state, habitaciones: action.payload };

    case "SET_PRIVILEGIOS":
      return { ...state, privilegiosAlojamientos: action.payload };

    case "SET_PRODUCTOS":
      return { ...state, productos: action.payload };

    case "SET_CATEGORIAS":
      return { ...state, categorias: action.payload };
    
    case "AGREGAR_CARACTERISTICA":
      return { ...state, caracteristicas: [...state.caracteristicas, action.payload] };

    case "EDITAR_CARACTERISTICA":
      return {
        ...state,
        caracteristicas: state.caracteristicas.map((c, i) =>
          i === action.payload.index ? action.payload.data : c
        )
      };

    case "ELIMINAR_CARACTERISTICA":
      return {
        ...state,
        caracteristicas: state.caracteristicas.filter((_, i) => i !== action.payload)
      };

    case "SET_MAESTROS":
      return { ...state, maestros: action.payload };

    case "AGREGAR_MAESTRO":
      return { ...state, maestros: [...state.maestros, action.payload] };

    case "EDITAR_MAESTRO":
      return {
        ...state,
        maestros: state.maestros.map((m) =>
          m.id === action.payload.id ? action.payload : m
        )
      };

    case "ELIMINAR_MAESTRO":
      return {
        ...state,
        maestros: state.maestros.filter((m) => m.id !== action.payload)
      };

    default:
      return state;
  }
};

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};