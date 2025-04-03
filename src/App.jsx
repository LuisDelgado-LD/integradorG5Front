import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./Context/utils/globalContext";
import usuariosService from "./services/UsuariosService";
import { setAuthToken } from "./services/Api";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Registro from "./Routes/Registro";
import Habitaciones from "./Routes/Habitaciones";
import Reserva from "./Routes/Reserva";
import PrivateRoute from "./Routes/PrivateRoute";
import Administrador from "./Routes/Administrador";
import UserManagement from "./Routes/UserManagement";
import GestionCaracteristicas from "./Routes/GestionCaracteristicas";
import Layout from "./Context/Layout/layout";
import GestionHabitaciones from "./Routes/GestionHabitaciones";
import BusquedaHabitaciones from "./Routes/BusquedaHabitaciones";

const App = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { usuario } = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
      usuariosService.getCurrentUser()
        .then((res) => {
          dispatch({ type: "LOGIN", payload: { usuario: res.data, token } });
        })
        .catch(() => {
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando usuario...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={!usuario ? <Login /> : <Navigate to="/" />} />
          <Route path="registro" element={!usuario ? <Registro /> : <Navigate to="/" />} />
          <Route path="habitacion/:id" element={<Habitaciones />} />
          <Route path="busqueda" element={<BusquedaHabitaciones />} />

          <Route element={<PrivateRoute />}>
            <Route path="reserva/:id" element={<Reserva />} />
          </Route>

          <Route element={<PrivateRoute requiredRole="ADMIN" />}>
            <Route path="administrador" element={<Administrador />} />
            <Route path="administrador/gestion-usuarios" element={<UserManagement />} />
            <Route path="administrador/gestion-habitaciones" element={<GestionHabitaciones />} />
            <Route path="administrador/gestion-caracteristicas" element={<GestionCaracteristicas />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
