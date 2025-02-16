import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext.jsx";

const Detail = () => {
  const { id } = useParams();
  const { state } = useContext(GlobalContext);
  const mascota = state.mascotas.find((m) => m.id === parseInt(id));

  if (!mascota) {
    return <p>Mascota no encontrada.</p>;
  }

  return (
    <div className="detail-page">
      <h2>{mascota.nombreMascota}</h2>
      <p><strong>Raza:</strong> {mascota.raza}</p>
      <p><strong>Tamaño:</strong> {mascota.tamano}</p>
    </div>
  );
};

export default Detail;