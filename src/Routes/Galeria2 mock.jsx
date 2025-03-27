import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const Galeria2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    document.body.style.overflow = "hidden"; 

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const habitacion = state.habitaciones.find((h) => h.id === parseInt(id));

  const imagenes = [
    "/img/galeria1.png",
    "/img/galeria2.png",
    "/img/galeria3.png",
    "/img/galeria4.png"
  ];

  if (!habitacion) {
    return <p>Habitación no encontrada.</p>;
  }

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
          backgroundImage: `url(${habitacion.imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          inset: -400,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 2,
        }}
      ></div>

      <img
        src="/img/flecha.png"
        alt="Volver"
        onClick={() => navigate(`/habitacion/${habitacion.id}`)}
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
              src={habitacion.imagen}
              alt={habitacion.nombre}
              style={{
                width: "600px",
                height: "400px",
                borderRadius: "20px",
                objectFit: "cover",
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
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
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

export default Galeria2;