import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Galeria = ({ habitacion, onClose }) => {
  const navigate = useNavigate();
  const imagenPrincipal = habitacion.imagenes.find((img) => img.esPrincipal)?.url || "";
  const imagenesExtra = habitacion.imagenes.filter((img) => !img.esPrincipal);
  const imagenes = [...imagenesExtra.map((img) => img.url), imagenPrincipal];

  const [imagenActiva, setImagenActiva] = useState(imagenPrincipal);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      setImagenActiva(imagenPrincipal);
    };
  }, [imagenPrincipal]);

  if (!habitacion) return <p>Cargando galería...</p>;

  return (
    <div
      className="galeria-container"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -400,
          backgroundImage: `url(${habitacion.imagenes?.[0]?.url || imagenPrincipal})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
          filter: "blur(12px)",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          inset: -400,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,
        }}
      ></div>

      <img
        src="/img/flecha.png"
        alt="Volver"
        onClick={() => {
          onClose ? onClose() : navigate(`/habitacion/${habitacion.id}`);
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          cursor: "pointer",
          width: "40px",
          zIndex: 4,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          padding: "40px",
        }}
      >
        <h2 style={{ color: "white", textAlign: "center", fontSize: "28px" }}>
          Galería de {habitacion.nombre}
        </h2>

        <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
          <div>
            <img
              src={imagenActiva}
              alt="Imagen activa"
              style={{
                width: "600px",
                height: "400px",
                borderRadius: "20px",
                objectFit: "cover",
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              width: "260px",
            }}
          >
            {imagenes.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Miniatura ${idx + 1}`}
                onClick={() => setImagenActiva(img)}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  cursor: "pointer",
                  border: img === imagenActiva ? "3px solid white" : "none",
                }}
                draggable={false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Galeria;
