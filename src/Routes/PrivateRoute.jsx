import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../Context/utils/globalContext";

const PrivateRoute = () => {
  const { state } = useContext(GlobalContext);
  return state.usuario ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;