import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "./Context/utils/globalContext";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Registro from "./Routes/Registro";
import Habitaciones from "./Routes/Habitaciones";
import Reserva from "./Routes/Reserva";
import PrivateRoute from "./Routes/PrivateRoute";
import Administrador from "./Routes/Administrador";
import UserManagement from "./Routes/UserManagement";
import GestionCaracteristicas from "./Routes/GestionCaracteristicas";
import GestionMaestro from "./Routes/GestionHabitaciones";
import Layout from "./Context/Layout/Layout";

const App = () => {
  const { state } = useContext(GlobalContext);
  const { usuario } = state;

  return (
    <BrowserRouter>
  <Routes>
    {/* Envolvemos todo dentro de Layout */}
    <Route path="/" element={<Layout />}>
      {/* Rutas públicas */}
      <Route index element={<Home />} />
      <Route path="login" element={!usuario ? <Login /> : <Navigate to="/" />} />
      <Route path="registro" element={!usuario ? <Registro /> : <Navigate to="/" />} />
      <Route path="habitacion/:id" element={<Habitaciones />} />

      {/* Rutas protegidas para usuarios */}
      <Route element={<PrivateRoute />}>
        <Route path="reserva/:id" element={<Reserva />} />
      </Route>

      {/* Rutas protegidas para admin */}
      <Route element={<PrivateRoute requiredRole="admin" />}>
        <Route path="administrador" element={<Administrador />} />
        <Route path="administrador/gestion-usuarios" element={<UserManagement />} />
        <Route path="administrador/gestion-habitaciones" element={<GestionMaestro />} />
        <Route path="administrador/gestion-caracteristicas" element={<GestionCaracteristicas />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
};

export default App;
