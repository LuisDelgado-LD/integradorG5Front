import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Components/Card"; // Asegúrate de que esta ruta sea correcta

const options = [
    {id: "1" ,nombre: "Chihuahua", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2024-04-22", "fecha_salida": "2024-06-06"},
    {id: "2" ,nombre: "Pomerania", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2023-01-30", "fecha_salida": "2023-11-18"},
    {id: "3" ,nombre: "Yorkshire", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2023-09-18", "fecha_salida": "2024-04-10"},
    {id: "4" ,nombre: "Pinscher", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2025-02-03", "fecha_salida": "2025-04-03"},
    {id: "5" ,nombre: "Maltés", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2024-12-25", "fecha_salida": "2025-08-16"},
    {id: "6" ,nombre: "Pekinés", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2023-01-30", "fecha_salida": "2023-11-14"},
    {id: "7" ,nombre: "Papillón", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2022-12-22", "fecha_salida": "2023-05-29"},
    {id: "8" ,nombre: "Shin Tzu", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2025-03-31", "fecha_salida": "2025-07-05"},
    {id: "9" ,nombre: "Bichón Frisé", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2022-11-23", "fecha_salida": "2022-12-30"},
    {id: "10" ,nombre: "Toy Poddle", imagen: "/img/PalacioPeludo.png", "fecha_ingreso": "2022-02-24", "fecha_salida": "2022-06-30"},
    {id: "11" ,nombre: "Begale", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2022-11-28", "fecha_salida": "2023-02-16"},
    {id: "11" ,nombre: "Cocker", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2023-01-21", "fecha_salida": "2023-02-23"},
    {id: "12" ,nombre: "Border Collie", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2023-02-05", "fecha_salida": "2023-03-06"},
    {id: "13" ,nombre: "Bulldog Francés", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2025-03-01", "fecha_salida": "2025-12-24"},
    {id: "14" ,nombre: "Schnauzer", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2024-12-24", "fecha_salida": "2025-06-19"},
    {id: "15" ,nombre: "Staffordshire Bull Terrier", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2022-06-12", "fecha_salida": "2022-06-22"},
    {id: "16" ,nombre: "Basenji", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2022-02-10", "fecha_salida": "2022-12-27"},
    {id: "17" ,nombre: "Whippet", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2023-07-11", "fecha_salida": "2024-03-23"},
    {id: "18" ,nombre: "Shetland Sheepdog", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2024-12-23", "fecha_salida": "2025-08-11"},
    {id: "19" ,nombre: "American Eskimo", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2024-06-20", "fecha_salida": "2024-11-18"},
    {id: "20" ,nombre: "Shiba Inu", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2024-06-07", "fecha_salida": "2025-01-12"},
    {id: "21" ,nombre: "Corgi", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2022-02-08", "fecha_salida": "2022-11-10"},
    {id: "22" ,nombre: "Springer Spaniel", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2023-10-23", "fecha_salida": "2024-07-16"},
    {id: "23" ,nombre: "Australian Shepherd", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2025-04-20", "fecha_salida": "2025-11-07"},
    {id: "24" ,nombre: "Samoyedo", imagen: "/img/RefugioConfortable.png", "fecha_ingreso": "2022-09-15", "fecha_salida": "2023-07-01"},
    {id: "25" ,nombre: "Labrador", imagen: "/img/CuevaAcogedora.png", "fecha_ingreso": "2022-07-30", "fecha_salida": "2022-10-14"},
    {id: "26" ,nombre: "Golden Retriever", imagen: "/img/CuevaAcogedora.png", "fecha_ingreso": "2023-04-02", "fecha_salida": "2023-08-04"},
    {id: "27" ,nombre: "Pastor Alemán", imagen: "/img/CuevaAcogedora.png", "fecha_ingreso": "2023-01-30", "fecha_salida": "2023-06-01"},
    {id: "28" ,nombre: "Husky Siberiano", imagen: "/img/CuevaAcogedora.png", "fecha_ingreso": "2025-11-06", "fecha_salida": "2026-02-08"},
    {id: "29" ,nombre: "Rottweiler", imagen: "/img/CuevaAcogedora.png", "fecha_ingreso": "2022-09-02", "fecha_salida": "2023-02-05"}
  ]

const Search = () => {
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
    const raza = searchParams.get("raza")?.toLowerCase() || "";
    const fechaIngreso = searchParams.get("fecha_ingreso");
    const fechaSalida = searchParams.get("fecha_salida");

    let resultados = options;

    if (raza) {
      resultados = resultados.filter((perro) => perro.nombre.toLowerCase().includes(raza));
      setIsLoading(false);
    }

    if (fechaIngreso && fechaSalida) {
      resultados = resultados.filter(
        (perro) =>
          new Date(perro.fecha_ingreso) <= new Date(fechaSalida) &&
          new Date(perro.fecha_salida) >= new Date(fechaIngreso)
      );
      setIsLoading(false);
    }

    setHabitaciones(resultados);
  }, [searchParams]);

  return (
    <div>
      <h2>Resultados de búsqueda</h2>
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <div style={styles.cardContainer}>    
        {habitaciones.length > 0 ? (
          habitaciones.map((habitacion) => (
            <Card key={habitacion.id} {...habitacion} />
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