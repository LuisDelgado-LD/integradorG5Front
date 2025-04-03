import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import { useSearchParams } from "react-router-dom";
import Card from "../Components/Card";
import axios from "axios";

const Search = () => {
  const { state, dispatch } = useContext(GlobalContext);
    const { API_URL } = state;
  const [searchParams] = useSearchParams();
  const [habitaciones, setHabitaciones] = useState([]);

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   // descomentar cuando se tenga listo la api

// useEffect(() => {
//     const raza = searchParams.get("raza")?.toLowerCase() || "";
//     const fechaIngreso = searchParams.get("fecha_ingreso");
//     const fechaSalida = searchParams.get("fecha_salida");

//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const queryParams = new URLSearchParams();
//         if (raza) queryParams.append("raza", raza);
//         if (fechaIngreso) queryParams.append("fecha_ingreso", fechaIngreso);
//         if (fechaSalida) queryParams.append("fecha_salida", fechaSalida);

//         const response = await fetch(`${API_URL}?${queryParams}`);
//         if (!response.ok) {
//           throw new Error("Error al obtener los datos");
//         }

//         const data = await response.json();
//         setHabitaciones(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [searchParams]);


// comentar el siguiente useeffect cuando se tenga listo la api
useEffect(() => {
  setIsLoading(true);
  setError(null);

  const nombre = searchParams.get("nombre")?.toLowerCase() || "";
  const fechaIngreso = searchParams.get("fecha_ingreso");
  const fechaSalida = searchParams.get("fecha_salida");

  const fetchData = async () => {
    try {
      let response;
      if (nombre) {
        response = await axios.get(`${API_URL}/habitaciones/Nombre`, {
          params: { nombre },
        });
        console.log(response)
      } else {
        response = await axios.get(`${API_URL}/habitaciones/disponibles`, {
          params: { fechaEntrada: fechaIngreso, fechaSalida },
        });
        console.log("Data")
        console.log(response.data)
      }

      setHabitaciones(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setError("No se encontraron resultados.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [searchParams]);

  return (
    <div>
      <h2>Resultados de búsqueda</h2>
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={styles.cardContainer}>    
        {habitaciones.length > 0 ? (
          habitaciones.map((habitacion) => (
            <Card 
              key={habitacion.id} 
              id={habitacion.id} 
              nombre={habitacion.nombre} 
              imagen={habitacion.imagenes.find(img => img.esPrincipal)?.url || "/img/not-found.jpg"} 
              ruta={`/habitacion/${habitacion.id}`}
            />
          ))
        ) : (
            !isLoading && <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
    cardContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "16px",
      justifyContent: "center",
      maxWidth: "1200px",
      margin: "auto",
    },
  };

export default Search;