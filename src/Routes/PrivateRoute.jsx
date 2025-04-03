import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { GlobalContext } from "../Context/utils/globalContext";

const PrivateRoute = ({ requiredRole }) => {
  const { state } = useContext(GlobalContext);
  const { usuario } = state;

  if (!usuario) {
    return <Navigate to="/login" state={{ mensaje: "Debes iniciar sesión" }} replace />;
  }

  if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
