import { useEffect, useState } from "react";

const Galeria = ({ habitacion, onClose }) => {
  const imagenPrincipal = habitacion.imagenes.find((img) => img.esPrincipal)?.url || "";
  const imagenesExtra = habitacion.imagenes.filter((img) => !img.esPrincipal);

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
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
      }}
    >
      
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "30px",
          fontSize: "28px",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          zIndex: 2,
        }}
        aria-label="Cerrar galería"
      >
        ❌
      </button>

      <h2 style={{ color: "white", fontSize: "28px", marginBottom: "30px" }}>
        Galería de {habitacion.nombre}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1100px",
        }}
      >
        <div style={{ flex: "1" }}>
          <img
            src={imagenActiva}
            alt="Imagen destacada"
            style={{
              width: "100%",
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
            width: "280px",
            flexShrink: 0,
          }}
        >
          {[...imagenesExtra, { url: imagenPrincipal }].map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`Miniatura ${idx + 1}`}
              onClick={() => setImagenActiva(img.url)}
              style={{
                width: "100%",
                height: "120px",
                borderRadius: "12px",
                objectFit: "cover",
                cursor: "pointer",
                border: img.url === imagenActiva ? "3px solid white" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Galeria;
