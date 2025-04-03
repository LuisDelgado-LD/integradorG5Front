import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";
import SoloEscritorio from "../Components/SoloEscritorio";
import Home from "./Home"; // importar el home para reutilizarlo

const Administrador = () => {
  const { state } = useContext(GlobalContext);
  const { usuario } = state;

  if (!usuario || usuario.rol !== "ADMIN") {
    return <p>No autorizado</p>;
  }

  return (
    <SoloEscritorio>
      <div className="admin-container">
        <Home />
      </div>
    </SoloEscritorio>
  );
};

export default Administrador;
